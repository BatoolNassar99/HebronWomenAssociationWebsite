import React from "react";
import OutgoingMessagesTable from "../Messages/OutgoingMessagesTable"
import '../Edit/Table.css'

const OutgoingMessages = () => {
  return (
    <div className="OutgoingMessages">
     <OutgoingMessagesTable />
    </div>
  );
};
export default OutgoingMessages;