import React from "react";
import IncomingMessagesTable from "../Messages/IncomingMessagesTable"
import '../Edit/Table.css'

const IncomingMessages = () => {
  return (
    <div className="IncomingMessages">
      <IncomingMessagesTable />
    </div>
  );
};
export default IncomingMessages;
