import React from "react";

function SupportTickets({ supportTickets }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-white";
      case "Open":
        return "bg-blue-500 text-white";
      case "Resolved":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="p-4">
      
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Ticket ID</th>
            <th className="py-2 px-4 border-b">Issue</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {supportTickets.map((ticket) => (
            <tr key={ticket.ticketId}>
              <td className="py-2 px-4 border-b">{ticket.ticketId}</td>
              <td className="py-2 px-4 border-b">{ticket.issue}</td>
              <td className="py-2 px-4 border-b">
                <span
                  className={`px-2 py-1 rounded ${getStatusColor(
                    ticket.status
                  )}`}
                >
                  {ticket.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SupportTickets;
