import TicketForm from "@/app/(components)/TicketForm";

const getTicketById = async (id) => {
  const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get ticket");
  }

  return res.json();
};

const TicketPage = async ({ params }) => {
  const id = params.id;
  const EDITMODE = id !== "new";

  let updateTicketData = {};

  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;
    console.log("update ticket data", updateTicketData);
  } else {
    updateTicketData = {
      _id: "new",
    };
  }

  return <TicketForm ticket={updateTicketData} />;
};

export const dynamic = "force-dynamic";

export default TicketPage;
