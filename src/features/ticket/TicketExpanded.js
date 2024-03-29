import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'
import { Modal, Button, Form, Input, Radio, Select, message, Tag } from 'antd';
import {
    CheckCircleOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';

import { BOARD_PROGRESS_COLUMNS, TICKET_DONE_REASONS, TICKETSAVE_SUCCESS } from '../../lib/Constants';


import {
    selectBoard,
    updateTicketStatus
} from '../../app/boardSlice';
import helper from '../../lib/Helper';


export default function TicketExpanded() {

    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const ticketArr = useSelector(selectBoard);
    const ticket = ticketArr.find(ticket => ticket.id === id);


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ticketProgress, setTicketProgress] = useState(ticket.progress);
    const [ticketTitle, setTicketTitle] = useState(ticket.title);
    const [ticketDescription, setTicketDescription] = useState(ticket.description | "");
    const [ticketReasonToDone, setTicketReasonToDone] = useState(ticket.closeReason | "");

    const onValueChange = (updatedFields) => {
        var fieldName = Object.keys(updatedFields)[0];
        var fieldValue = Object.values(updatedFields)[0];
        switch (fieldName) {
            case "title":
                setTicketTitle(fieldValue);
                break;
            case "progress":
                setTicketProgress(fieldValue);
                break;
            case "description":
                setTicketDescription(fieldValue);
                break;
            case "reason_to_done":
                setTicketReasonToDone(fieldValue);
                break;
            default:
                break;
        }
    };


    const redirectToHome = () => {
        history.push("/");
    }

    const handleSave = () => {
        if (validateForm()) {
            updateTicketDetails();
            setIsModalVisible(false);
            redirectToHome();
            message.success(TICKETSAVE_SUCCESS)
        }
    };

    const updateTicketDetails = () => {
        const completionDate = ticketProgress === BOARD_PROGRESS_COLUMNS.COMPLETED.value ? Date.now() : "";
        const closeReason = ticketProgress === BOARD_PROGRESS_COLUMNS.DONE.value && ticketReasonToDone ? ticketReasonToDone : ""
        dispatch(updateTicketStatus({
            id: ticket.id,
            title: ticketTitle,
            description: ticketDescription,
            progress: ticketProgress,
            endDate: completionDate,
            closeReason: closeReason
        }))
    }

    const handleCancel = () => {
        setIsModalVisible(false);
        redirectToHome();
    };

    const validateForm = () => {
        let isFormValid = true;
        if (!ticketTitle)
            isFormValid = false;
        if (ticketProgress === BOARD_PROGRESS_COLUMNS.DONE.value && !ticketReasonToDone) {
            isFormValid = false;
            document.querySelector('.reason_select input').focus();
        }
        return isFormValid;
    }


    useEffect(() => {
        setIsModalVisible(true);
    }, [])

    return (
        <Modal title={ticket.title} visible={isModalVisible} onCancel={handleCancel} footer={
            [
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSave}>
                    Submit
                </Button>
            ]}>
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    progress: ticketProgress,
                    title: ticketTitle,
                    description: ticketDescription
                }}
                onValuesChange={onValueChange}
            >
                <Form.Item label="Title" required tooltip="This is a required field" name="title" rules={[{
                    required: true,
                    message: "Please Enter Title"
                }
                ]}>
                    <Input placeholder="Ticket Title" />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input.TextArea placeholder="What does this ticket do.." rows={4} />
                </Form.Item>
                <Form.Item label="Status" name="progress">
                    <Radio.Group>
                        <Radio.Button value={BOARD_PROGRESS_COLUMNS.NOT_STARTED.value}>{BOARD_PROGRESS_COLUMNS.NOT_STARTED.value}</Radio.Button>
                        <Radio.Button value={BOARD_PROGRESS_COLUMNS.IN_PROGRESS.value}>{BOARD_PROGRESS_COLUMNS.IN_PROGRESS.value}</Radio.Button>
                        <Radio.Button value={BOARD_PROGRESS_COLUMNS.DONE.value}>{BOARD_PROGRESS_COLUMNS.DONE.value}</Radio.Button>
                        <Radio.Button value={BOARD_PROGRESS_COLUMNS.COMPLETED.value}>{BOARD_PROGRESS_COLUMNS.COMPLETED.value}</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                {ticketProgress === BOARD_PROGRESS_COLUMNS.DONE.value && <Form.Item label="Reason to Close" required name="reason_to_done" rules={[{
                    required: true
                }
                ]}>
                    <Select className="reason_select" value="COMPLETED">
                        {Object.entries(TICKET_DONE_REASONS).map((obj, index) => (
                            <Select.Option value={obj[1]} key={`reason_${index}`} >{obj[1]}</Select.Option>
                        )
                        )}
                    </Select>
                </Form.Item>}
                <div>
                    <Tag icon={<ClockCircleOutlined />} color="default"> {helper.renderDateString(ticket.startDate)}</Tag>
                    {ticket.endDate && <Tag icon={<CheckCircleOutlined />} color="success">{helper.renderDateString(ticket.endDate)}</Tag>}
                </div>
            </Form>
        </Modal>
    )
};