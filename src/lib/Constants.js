// export const 

//     const TICKET_TITLE_INPUT_CLASSNAME = "ticket_title_input";
//     const TICKET_TITLE_INPUT_PLACEHOLDER = "Enter Ticket Title";
//     const TICKETTITLE_WARNING = "Please add ticket title";


//     const PROGRESS_STATES = {
//         NOT_STARTED: "NOT STARTED",
//         IN_PROGRESS: "NOT STARTED",
//         DONE: "DONE STARTED",
//         COMPLETED: "COMPLETED",
//     };




//     return (
//         <>
//             <div className={styles.headerWrapper}>
//                 <Row>
//                     <Col span={4}>
//                         <div>
//                             <Typography.Title level={3}>Ticketera</Typography.Title>
//                         </div>
//                     </Col>
//                     <Col span={12} offset={8}>
//                         <div className={styles.input_wrapper}>
//                             <Input type="text" className={TICKET_TITLE_INPUT_CLASSNAME} placeholder={TICKET_TITLE_INPUT_PLACEHOLDER} />
//                             {loadingState ?
//                                 <Button type="primary" loading={true}>Adding Ticket</Button> :
//                                 <Button type="primary" onClick={() => postNewTicket(5000)}>Add Ticket</Button>
//                             }
//                         </div>
//                     </Col>
//                 </Row>
//             </div>

//             <Row>
//                 <Col span={6} className={styles.columns}>
//                     <Typography.Title className={styles.columTitle} level={5}>Not Started</Typography.Title>
//                     {RenderTicketForGrid(tickets, "Not Started")}
//                 </Col>
//                 <Col span={6} className={styles.columns} onDragOver={allowDrop} onDrop={(evt) => onDrop(evt, "In Progress")}>
//                     <Typography.Title className={styles.columTitle} level={5}>In Progress</Typography.Title>
//                     {RenderTicketForGrid(tickets, "In Progress")}
//                 </Col>
//                 <Col span={6} className={styles.columns} onDragOver={allowDrop} onDrop={(evt) => onDrop(evt, "Done")}>
//                     <Typography.Title className={styles.columTitle} level={5}>Done</Typography.Title>
//                     {RenderTicketForGrid(tickets, "Done")}
//                 </Col>
//                 <Col span={6} className={styles.columns} onDragOver={allowDrop} onDrop={(evt) => onDrop(evt, "Completed")}>
//                     <Typography.Title className={styles.columTitle} level={5}>Completed</Typography.Title>
//                     {RenderTicketForGrid(tickets, "Completed")}
//                 </Col>
//             </Row>
//         </>
//     )
// }

export const TICKET_TITLE_INPUT_CLASSNAME = "ticket_title_input";
export const TICKET_TITLE_INPUT_PLACEHOLDER = "Enter Ticket Title";
export const TICKETTITLE_WARNING = "Please add ticket title";
export const BOARD_PROGRESS_COLUMNS = {
    NOT_STARTED: "NOT STARTED",
    IN_PROGRESS: "IN PROGRESS",
    DONE: "DONE",
    COMPLETED: "COMPLETED",
};
export const TICKET_DONE_REASONS = {
    NOT_FIXED: "NOT FIXED",
    COMPLETED: "COMPLETED"
};


