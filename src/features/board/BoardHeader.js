import React , { useState } from 'react';
import {  useDispatch } from 'react-redux';
import {
    addNewTicket
} from '../../app/boardSlice';

import {
    TICKET_TITLE_INPUT_CLASSNAME,
    TICKET_TITLE_INPUT_PLACEHOLDER,
    TICKETTITLE_WARNING,
    BOARD_PROGRESS_COLUMNS
} from '../../lib/Constants';

import { Button, Input, Row, Col, Typography , message} from 'antd';

import Helper from '../../lib/Helper';

import styles from './Board.module.css';

const BoardHeader = React.memo(() => {

    const dispatch = useDispatch();

    const [loadingState, toggleLoadingState] = useState(false);
    const [newTicketTitle, setNewTicketTitle] = useState("");
    const [newTicketID, setNewTicketID] = useState(1000);



    const postNewTicket = () => {
        if (!newTicketTitle) {
            message.error(TICKETTITLE_WARNING, [5]);
            return;
        }
        toggleLoadingState(true);
        Helper.setDelay(3000).then(() => {
            getTicketDetails();
            toggleLoadingState(false);
        });
    }

    const getTicketDetails = () => {
        debugger;
        document.getElementsByClassName(TICKET_TITLE_INPUT_CLASSNAME)[0].value = " ";
        dispatch(addNewTicket({
            id: `tkt-${newTicketID}`,
            title: newTicketTitle,
            startDate: Date.now(),
            progress: BOARD_PROGRESS_COLUMNS.NOT_STARTED
        }))
        setNewTicketTitle("");
        setNewTicketID(newTicketID + 1)
    }

    return (
        <div className={styles.headerWrapper}>
            <Row>
                <Col span={4}>
                    <div>
                        <Typography.Title level={3}>Ticketera</Typography.Title>
                    </div>
                </Col>
                <Col span={12} offset={8}>
                    <div className={styles.input_wrapper}>
                        <Input type="text" className={TICKET_TITLE_INPUT_CLASSNAME} placeholder={TICKET_TITLE_INPUT_PLACEHOLDER} value={newTicketTitle} onChange={(e) => setNewTicketTitle(e.target.value)} />
                        {loadingState ?
                            <Button type="primary" className={styles.indigoBtn} loading={true}>Adding Ticket</Button> :
                            <Button type="primary" className={styles.indigoBtn} onClick={() => postNewTicket(5000)}>Add Ticket</Button>
                        }
                    </div>
                </Col>
            </Row>
        </div>

    )
});


export default BoardHeader;