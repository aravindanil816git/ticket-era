import React, { useState } from 'react';
import { Card, Space, Menu, Dropdown } from 'antd';
import { DownOutlined, ExclamationCircleOutlined, EditOutlined, MinusOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

import { BOARD_PROGRESS_COLUMNS, TICKET_DONE_REASONS, TICKET_ID_IDENTIFIER } from '../../lib/Constants';
import Helper from '../../lib/Helper';


import styles from './Ticket.module.css';

export function Ticket(props) {

    const [closeReason, toggeleCloseReason] = useState(props.closeReason || 'Reason to close');

    const drag = (ev, id) => {
        ev.dataTransfer.setData(TICKET_ID_IDENTIFIER, id);
    }

    const renderMenu = (id) => {
        return (
            <Menu>
                <Menu.Item disabled>
                    <div>Reason to Close</div>
                </Menu.Item>
                { Object.entries(TICKET_DONE_REASONS).map((obj) => (
                    <Menu.Item>
                        <div onClick={() => {
                            toggeleCloseReason(obj[1]);
                            props.onTicketComplete(id, closeReason);
                        }}>{obj[1]}</div>
                    </Menu.Item>
                ))}
            </Menu>
        )
    }
    
    const renderProgressBandWithTitleHeader = (progress, title) => {
        return (
            <div className={styles.bandWrapper}>
                <div>
                    <MinusOutlined className={styles.progressBand} style={{ color: Helper.getColorByProgress(progress) }} />
                </div>
                <div>{title}</div>
            </div>
        )
    }
    
    const renderEditIconWrapper = (id) => {
        return (
            <div className={styles.editWrapper}>
                <NavLink to={`ticket/${id}`}>
                    <EditOutlined className={styles.editIcon} /></NavLink>
            </div>
        )
    }
    

    return (
        <Space direction="vertical">
            <Card className={styles.ticket} title={renderProgressBandWithTitleHeader(props.progress, props.title)}
                extra={renderEditIconWrapper(props.id)}
                draggable={true} onDragStart={(evt) => drag(evt, props.id)} hoverable={true}>
                <p>{props.description}</p>
                {props.progress === BOARD_PROGRESS_COLUMNS.DONE &&
                    <>
                        {closeReason === 'Reason to close' && <ExclamationCircleOutlined className={styles.warningIcon} />}
                        <Dropdown overlay={() => renderMenu(props.id)}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                {closeReason} <DownOutlined />
                            </a>
                        </Dropdown>
                    </>
                }
            </Card>
        </Space>
    )
}

