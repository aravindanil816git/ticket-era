import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectBoard,
    updateTicketStatus,
    updateCompletionTime
} from '../../app/boardSlice';

import styles from './Board.module.css';
import { Row, Col, Typography} from 'antd';

import { Ticket } from '../ticket/Ticket';

import { 
    TICKET_ID_IDENTIFIER,
    BOARD_PROGRESS_COLUMNS } from '../../lib/Constants';

import Helper from '../../lib/Helper';
import BoardHeader from './BoardHeader';

export function Board() {

    const tickets = useSelector(selectBoard);
    const dispatch = useDispatch();

    const allowDrop = (evt) => {
        evt.preventDefault();
    }

    const onDrop = (evt, newstate) => {
        evt.preventDefault();
        const data = evt.dataTransfer.getData(TICKET_ID_IDENTIFIER);
        dispatch(updateTicketStatus({ id: data, progress: newstate }));
    }

    const updateTicketCompletionTime = (ticketId, reason) => {
        Helper.setDelay(5000).then(() => {
            dispatch(updateCompletionTime({ id: ticketId, closeReason: reason }));
        });
    }


    const RenderTicketForGrid = (ticketArray = [], progressStatus) => {
        ticketArray = ticketArray.filter(ticket => ticket.progress === progressStatus);
        if (ticketArray && ticketArray.length === 0) return;
        return ticketArray.map((ticket, index) =>
        (

            <div key={`ticket_${index}`} id={ticket.id} >
                <Ticket {...ticket} onTicketComplete={updateTicketCompletionTime} />
            </div>
        )
        )
    }

    const renderBoardColumns = () => {
        return Object.entries(BOARD_PROGRESS_COLUMNS).map((obj,index) => (
            <Col key={`col${index}`}  span={6} className={styles.columns} onDragOver={allowDrop} onDrop={(evt) => onDrop(evt, obj[1])}>
                <Typography.Title className={styles.columTitle} level={5}>{obj[1]}</Typography.Title>
                {RenderTicketForGrid(tickets, obj[1])}
            </Col>
        ));
    }



    return (
        <>
            <BoardHeader />
            <Row>
                {renderBoardColumns()}
            </Row>
        </>
    )
}