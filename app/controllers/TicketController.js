const {
  SoftwareName,
  Ticket,
  Message,
  Service,
  TicketSupport,
  Status,
} = require("../models/index");

async function saveTicket(req, res) {
  try {
    const ticketData = req.body;
    const randomString5 = generateRandomString(10);

    const ticketSaveData = await Ticket.create({
      ticket_no: randomString5,
      name: ticketData.name,
      email: ticketData.email,
      subject: ticketData.subject,
      related_service_id: ticketData.related_service_id,
      software_name_id: ticketData.software_name_id,
    });

    const MessageData = await Message.create({
      ticket_id: ticketSaveData.id_ticket,
      message: ticketData.message,
    });
    const ticketSupportData = await TicketSupport.create({
      ticket_id: ticketSaveData.id_ticket,
      status_id: ticketData.status_id,
      last_update: ticketData.date,
    });
    console.log(
      "Data inserted successfully:",
      ticketSaveData,
      ticketSupportData,
      MessageData
    );
    res.status(200).json(ticketSaveData);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getTicketData(req, res) {
  try {
    const data = await Ticket.findAll({
      include: [
        { model: SoftwareName },
        { model: Service },
        
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getTicketSupportData(req, res) {
  try {
    const data = await TicketSupport.findAll({
      include: [
        {
          model: Ticket,
          include: [
            { model: Service },
            { model: SoftwareName },
          ],
        },
        { model: Status },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
// Export each function individually
module.exports = {
  saveTicket,
  getTicketData,
  getTicketSupportData,
};

const crypto = require("crypto");

function generateRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";

  let randomString = "";

  // Ensure at least one character is included
  const randomCharIndex = crypto.randomInt(chars.length);
  randomString += chars.charAt(randomCharIndex);

  // Generate the remaining characters
  for (let i = 1; i < length - 1; i++) {
    const randomIndex = crypto.randomInt(chars.length);
    randomString += chars.charAt(randomIndex);
  }

  // Ensure at least one digit is included
  const randomDigitIndex = crypto.randomInt(digits.length);
  randomString += digits.charAt(randomDigitIndex);

  // Shuffle the characters to make the string more random
  randomString = shuffleString(randomString);

  return randomString;
}

// Helper function to shuffle a string
function shuffleString(str) {
  const arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}
