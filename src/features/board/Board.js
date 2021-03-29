import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    addNewTicket,
    selectBoard,
    updateTicketStatus,
    updateCompletionTime
} from '../../app/boardSlice';

import styles from './Board.module.css';
import { Button, Input, Row, Col, Typography } from 'antd';

import { Ticket } from '../ticket/Ticket';

import { 
    TICKET_TITLE_INPUT_CLASSNAME,
    TICKET_TITLE_INPUT_PLACEHOLDER ,
    TICKETTITLE_WARNING,
    BOARD_PROGRESS_COLUMNS } from '../../lib/Constants';

export function Board() {

    const tickets = useSelector(selectBoard);
    const dispatch = useDispatch();


    const [loadingState, toggleLoadingState] = useState(false);


    const getTicketDetails = () => {
        const ticketTitle = document.getElementsByClassName(TICKET_TITLE_INPUT_CLASSNAME)[0].value;
        debugger;
        document.getElementsByClassName(TICKET_TITLE_INPUT_CLASSNAME)[0].value = " ";
        if (!ticketTitle) {
            alert(TICKETTITLE_WARNING);
            return;
        }
        dispatch(addNewTicket({
            id: generateTicketID(ticketTitle),
            title: ticketTitle,
            progress: BOARD_PROGRESS_COLUMNS.NOT_STARTED
        }))
    }

    const generateTicketID = (ticketTitle) => {
        return `tkt_${ticketTitle.substring(0, 5).trim()}_${Math.floor(Math.random() * 10)}`
    }

    const allowDrop = (evt) => {
        evt.preventDefault();
    }

    const onDrop = (evt, newstate) => {
        evt.preventDefault();
        debugger;
        const data = evt.dataTransfer.getData("text");
        dispatch(updateTicketStatus({ id: data, progress: newstate }));
    }

    const delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const postNewTicket = () => {
        toggleLoadingState(true);
        delay(3000).then(() => {
            getTicketDetails();
            toggleLoadingState(false);
        });
    }

    const updateTicketCompletionTime = (ticketId, reason) => {
        delay(5000).then(() => {
            dispatch(updateCompletionTime({ id: ticketId, closeReason: reason }));
        })
    }


    const RenderTicketForGrid = (ticketArray = [], progressStatus) => {
        debugger;
        ticketArray = ticketArray.filter(ticket => ticket.progress === progressStatus);
        if (ticketArray && ticketArray.length == 0) return;
        return ticketArray.map((ticket, index) =>
        (

            <div key={`ticket_${index}`} id={ticket.id} >
                <Ticket {...ticket} onTicketComplete={updateTicketCompletionTime} />
            </div>
        )
        )
    }

    const renderBoardColumns = () => {
        debugger;
        return Object.entries(BOARD_PROGRESS_COLUMNS).map((obj) => (
            <Col span={6} className={styles.columns} onDragOver={allowDrop} onDrop={(evt) => onDrop(evt, obj[1])}>
                <Typography.Title className={styles.columTitle} level={5}>{obj[1]}</Typography.Title>
                {RenderTicketForGrid(tickets, obj[1])}
            </Col>
        ));
    }



    return (
        <>
            <div className={styles.headerWrapper}>
                <Row>
                    <Col span={4}>
                        <div>
                            <Typography.Title level={3}>Ticketera</Typography.Title>
                        </div>
                    </Col>
                    <Col span={12} offset={8}>
                        <div className={styles.input_wrapper}>
                            <Input type="text" className={TICKET_TITLE_INPUT_CLASSNAME} placeholder={TICKET_TITLE_INPUT_PLACEHOLDER} />
                            {loadingState ?
                                <Button type="primary" loading={true}>Adding Ticket</Button> :
                                <Button type="primary" onClick={() => postNewTicket(5000)}>Add Ticket</Button>
                            }
                        </div>
                    </Col>
                </Row>
            </div>

            <Row>
                {renderBoardColumns()}
            </Row>
        </>
    )
}