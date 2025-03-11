import React, { useState } from 'react'
import DisplayCustomer from './DisplayCustomer';
function ManageCustomers(){
  const [selected,setSelected]=useState('');
  const [bg,setGb]=useState('');
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      address: "123 Elm Street, NY",
      orderHistory: [
        { orderId: "ORD001", date: "2024-12-25", amount: 120 },
        { orderId: "ORD002", date: "2025-02-15", amount: 250 },
      ],
      totalSpending: 370,
      ordersLastYear: 1, // Orders in 2024
      ordersThisYear: 1, // Orders in 2025
      supportTickets: [
        { ticketId: "TCKT001", issue: "Delayed Delivery", status: "Resolved" },
        { ticketId: "TCKT002", issue: "Wrong Item", status: "Open" },
      ],
      accountStatus: "Active",
      loyaltyPoints: 1200,
      promotionsSent: [
        { couponCode: "NEWYEAR20", discount: "20%", expiry: "2025-01-31" },
      ],
      internalNotes: "Prefers email communication.",
      flagged: false,
      availableCustomer: true,
      mostFrequentBuyer: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+9876543210",
      address: "456 Maple Avenue, CA",
      orderHistory: [
        { orderId: "ORD003", date: "2025-03-01", amount: 90 },
        { orderId: "ORD004", date: "2025-03-20", amount: 150 },
        { orderId: "ORD004", date: "2024-03-20", amount: 150 },
      ],
      totalSpending: 390,
      ordersLastYear: 1, // Orders in 2024
      ordersThisYear: 2, // Orders in 2025
      supportTickets: [
        { ticketId: "TCKT003", issue: "Refund Request", status: "Pending" },
      ],
      accountStatus: "Inactive",
      loyaltyPoints: 800,
      promotionsSent: [
        { couponCode: "SPRING10", discount: "10%", expiry: "2025-03-31" },
      ],
      internalNotes: "Requested account reactivation.",
      flagged: true,
      availableCustomer: false,
      mostFrequentBuyer: false,
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "+1122334455",
      address: "789 Oak Street, TX",
      orderHistory: [
        { orderId: "ORD005", date: "2024-12-01", amount: 300 },
        { orderId: "ORD006", date: "2025-02-18", amount: 180 },
      ],
      totalSpending: 480,
      ordersLastYear: 1, // Orders in 2024
      ordersThisYear: 1, // Orders in 2025
      supportTickets: [],
      accountStatus: "Active",
      loyaltyPoints: 1500,
      promotionsSent: [],
      internalNotes: "",
      flagged: false,
      availableCustomer: true,
      mostFrequentBuyer: false,
    },
    {
      id: 4,
      name: "Bob Carter",
      email: "bob.carter@example.com",
      phone: "+9988776655",
      address: "10 Pine Street, FL",
      orderHistory: [
        { orderId: "ORD007", date: "2025-01-20", amount: 450 },
        { orderId: "ORD007", date: "2024-01-20", amount: 450 }
      ],
      totalSpending: 900,
      ordersLastYear: 1, // Orders in 2024
      ordersThisYear: 1, // Orders in 2025
      supportTickets: [
        { ticketId: "TCKT004", issue: "Payment Issue", status: "Resolved" },
      ],
      accountStatus: "Active",
      loyaltyPoints: 500,
      promotionsSent: [
        { couponCode: "WINTER15", discount: "15%", expiry: "2025-12-31" },
      ],
      internalNotes: "First-time buyer.",
      flagged: false,
      availableCustomer: true,
      mostFrequentBuyer: false,
    },
    {
      id: 5,
      name: "Diana Prince",
      email: "diana.prince@example.com",
      phone: "+1234509876",
      address: "888 Sunset Blvd, LA",
      orderHistory: [
        { orderId: "ORD008", date: "2024-11-10", amount: 200 },
        { orderId: "ORD009", date: "2025-02-25", amount: 350 },
      ],
      totalSpending: 550,
      ordersLastYear: 1, // Orders in 2024
      ordersThisYear: 1, // Orders in 2025
      supportTickets: [],
      accountStatus: "Inactive",
      loyaltyPoints: 300,
      promotionsSent: [],
      internalNotes: "Prefers evening calls.",
      flagged: false,
      availableCustomer: false,
      mostFrequentBuyer: false,
    },
    {
      id: 6,
      name: "Olivia Brown",
      email: "olivia.b@example.com",
      phone: "+1234567896",
      address: "123 Pine Street, FL",
      orderHistory: [
        { orderId: "ORD010", date: "2024-12-15", amount: 500 },
        { orderId: "ORD011", date: "2025-01-10", amount: 400 },
      ],
      totalSpending: 900,
      supportTickets: [],
      accountStatus: "Active",
      loyaltyPoints: 1500,
      promotionsSent: [
        { couponCode: "NEWYEAR25", discount: "25%", expiry: "2025-01-31" },
      ],
      internalNotes: "",
      flagged: false,
      isAvailableCustomer: true,
      previousYearOrders: 1,
      currentYearOrders: 1,
      isFrequentBuyer: true,
      hasIssues: false,
    },
    {
      id: 7,
      name: "Ethan Davis",
      email: "ethan.d@example.com",
      phone: "+9876543217",
      address: "456 Oak Avenue, CO",
      orderHistory: [{ orderId: "ORD012", date: "2025-02-20", amount: 300 },
                    { orderId: "ORD0121", date: "2024-02-20", amount: 400 }
      ],
      totalSpending: 700,
      supportTickets: [],
      accountStatus: "Active",
      loyaltyPoints: 700,
      promotionsSent: [],
      internalNotes: "Prefers email communication.",
      flagged: false,
      isAvailableCustomer: true,
      previousYearOrders: 1,
      currentYearOrders: 1,
      isFrequentBuyer: false,
      hasIssues: false,
    },
    {
      id: 8,
      name: "Mia Wilson",
      email: "mia.w@example.com",
      phone: "+6549873218",
      address: "789 Birch Lane, NV",
      orderHistory: [
        { orderId: "ORD013", date: "2024-10-25", amount: 250 },
        { orderId: "ORD014", date: "2025-01-15", amount: 350 },
      ],
      totalSpending: 600,
      supportTickets: [
        { ticketId: "TCKT003", issue: "Delayed Delivery", status: "Resolved" },
      ],
      accountStatus: "Active",
      loyaltyPoints: 1000,
      promotionsSent: [
        { couponCode: "WINTER15", discount: "15%", expiry: "2025-02-28" },
      ],
      internalNotes: "Usually orders during sales.",
      flagged: false,
      isAvailableCustomer: true,
      previousYearOrders: 1,
      currentYearOrders: 1,
      isFrequentBuyer: true,
      hasIssues: false,
    },
    {
      id: 9,
      name: "Ava Martinez",
      email: "ava.m@example.com",
      phone: "+7418529639",
      address: "321 Cedar Boulevard, TX",
      orderHistory: [],
      totalSpending: 0,
      supportTickets: [
        { ticketId: "TCKT004", issue: "Password Reset", status: "Open" },
      ],
      accountStatus: "Inactive",
      loyaltyPoints: 0,
      promotionsSent: [],
      internalNotes: "No orders placed yet.",
      flagged: true,
      isAvailableCustomer: false,
      previousYearOrders: 0,
      currentYearOrders: 0,
      isFrequentBuyer: false,
      hasIssues: true,
    },
    {
      id: 10,
      name: "Isaac Newton",
      email: "isaac.n@example.com",
      phone: "+9991122334",
      address: "987 Apple Road, MA",
      orderHistory: [
        { orderId: "ORD014", date: "2024-03-01", amount: 500 },
        { orderId: "ORD015", date: "2025-03-10", amount: 300 },
      ],
      totalSpending: 800,
      supportTickets: [
        { ticketId: "TCKT005", issue: "Refund Request", status: "Open" },
      ],
      accountStatus: "Active",
      loyaltyPoints: 1200,
      promotionsSent: [
        { couponCode: "MARCH20", discount: "20%", expiry: "2025-03-31" },
      ],
      internalNotes: "",
      flagged: false,
      isAvailableCustomer: true,
      previousYearOrders: 1,
      currentYearOrders: 1,
      isFrequentBuyer: true,
      hasIssues: true,
    },
    {
      id: 11,
      name: "Jake Paul",
      email: "jake.p@example.com",
      phone: "+8887654321",
      address: "444 Willow Street, CA",
      orderHistory: [{ orderId: "ORD016", date: "2025-01-15", amount: 250 },
        { orderId: "ORD017", date: "2024-01-15", amount: 550 }
      ],
      totalSpending: 800,
      supportTickets: [],
      accountStatus: "Inactive",
      loyaltyPoints: 100,
      promotionsSent: [],
      internalNotes: "",
      flagged: true,
      isAvailableCustomer: false,
      previousYearOrders: 1,
      currentYearOrders: 1,
      isFrequentBuyer: false,
      hasIssues: true,
    },
    {
      id: 12,
      name: "Karen Taylor",
      email: "karen.t@example.com",
      phone: "+5554443332",
      address: "321 Park Avenue, NY",
      orderHistory: [
        { orderId: "ORD017", date: "2024-02-28", amount: 400 },
        { orderId: "ORD018", date: "2025-03-05", amount: 150 },
      ],
      totalSpending: 550,
      supportTickets: [],
      accountStatus: "Active",
      loyaltyPoints: 950,
      promotionsSent: [],
      internalNotes: "",
      flagged: false,
      isAvailableCustomer: true,
      previousYearOrders: 1,
      currentYearOrders: 1,
      isFrequentBuyer: true,
      hasIssues: false,
    },
    {
      id: 13,
      name: "Lucas Grey",
      email: "lucas.g@example.com",
      phone: "+3216549870",
      address: "678 Elm Street, WA",
      orderHistory: [{ orderId: "ORD019", date: "2025-03-10", amount: 600 },
        { orderId: "ORD0191", date: "2024-03-10", amount: 600 }
      ],
      totalSpending: 1200,
      supportTickets: [],
      accountStatus: "Active",
      loyaltyPoints: 700,
      promotionsSent: [],
      internalNotes: "Responds quickly to offers.",
      flagged: false,
      isAvailableCustomer: true,
      previousYearOrders: 1,
      currentYearOrders: 1,
      isFrequentBuyer: false,
      hasIssues: false,
    },
    {
      id: 14,
      name: "Emily Clark",
      email: "emily.c@example.com",
      phone: "+5552223334",
      address: "345 Lakeview Drive, OR",
      orderHistory: [
        { orderId: "ORD0201", date: "2024-11-15", amount: 450 },
        { orderId: "ORD021", date: "2025-02-01", amount: 300 },
      ],
      totalSpending: 750,
      supportTickets: [],
      accountStatus: "Active",
      loyaltyPoints: 1200,
      promotionsSent: [
        { couponCode: "WINTER20", discount: "20%", expiry: "2025-12-31" },
      ],
      internalNotes: "",
      flagged: false,
      isAvailableCustomer: true,
      previousYearOrders: 1,
      currentYearOrders: 1,
      isFrequentBuyer: true,
      hasIssues: false,
    },
    {
      id: 15,
      name: "Sophia White",
      email: "sophia.w@example.com",
      phone: "+7894561230",
      address: "789 Maple Avenue, TX",
      orderHistory: [{ orderId: "ORD0190", date: "2025-03-10", amount: 600 },
        { orderId: "ORD0191", date: "2024-03-10", amount: 680 }
      ],
      totalSpending: 1280,
      supportTickets: [
        { ticketId: "TCKT006", issue: "Account Deletion Request", status: "Open" },
      ],
      accountStatus: "Inactive",
      loyaltyPoints: 0,
      promotionsSent: [],
      internalNotes: "Pending account deletion.",
      flagged: true,
      isAvailableCustomer: false,
      previousYearOrders: 1,
      currentYearOrders: 1,
      isFrequentBuyer: false,
      hasIssues: true,
    },
  ];
  
  
  const handleItem=(item,color)=>{
    setSelected(item);
    setGb(color)
    console.log(color);
  }
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery) ||
    customer.email.toLowerCase().includes(searchQuery) ||
    customer.phone.includes(searchQuery) ||
    customer.address.toLowerCase().includes(searchQuery)
  );

  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"];
  return(
    <>
    <div>
    <div className="p-4">
      <div className="flex gap-4">
        {/* Left Menu Section */}
        <div className="w-1/3 p-4 overflow-y-scroll max-h-[500px] border border-gray-200 rounded-lg shadow-md">
          <h1 className="text-center text-2xl font-bold border-b-4 pb-2 mb-4">Customers</h1>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
            placeholder={"Search..."}
          />
          <span className="text-sm text-gray-500">Click an customer for an overview</span>
          {filteredCustomers.map((item, index) => (
            <div
              className="w-full p-2 mb-2 shadow-sm border border-gray-100 rounded-lg flex gap-6 items-center cursor-pointer"
              key={index}
              onClick={() => handleItem(item,colors[index % colors.length])}
            >
            <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-xl font-bold ${
              colors[index % colors.length]
            }`}
            >
          {(item.name.slice(0, 1)).toUpperCase()}
          </div>
            <div>
            <h4 className="text-base font-semibold" onClick={(e)=>handleItem(item)}>{item.name}</h4>
            <p>{item.email}</p>
            </div>
            
            </div>
          ))}
        </div>

        {/* Right Info Section */}
        <div className="w-full overflow-y-scroll border border-gray-200 rounded-lg shadow-md max-h-[500px]">
        { selected && <DisplayCustomer item={selected} color={bg}/>}
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default ManageCustomers