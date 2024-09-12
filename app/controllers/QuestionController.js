const {
  Question,
  Ticket,
  Answer,
  Service,
  Message,
  SoftwareName,
  TicketSupport,
} = require("../models/index");

async function getQuestionData(req, res) {
  try {
    // Your code here
    const data = await Question.findAll({
      include: [
        {
          model: Message,
          include: {
            model: Ticket,
            include: [{ model: Service }, { model: SoftwareName }],
          },
        },
        { model: Answer },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function upadteQuestion(req, res) {
  try {
    const questionData = req.body;

    const answerData = await Answer.create({
      answer: questionData.answer,
      date: questionData.date,
    });

    const ticketSupportData = await TicketSupport.update(
      {
        status_id: questionData.status_id,
        last_update: questionData.date,
      },
      {
        where: {
          ticket_id: questionData.ticket_id,
        },
      }
    );

    const data = await Question.update(
      {
        question: questionData.question,
        answer_id: answerData.id_answer,
      },
      {
        where: {
          id_question: questionData.id_question,
        },
      }
    );
    console.log("Data inserted successfully:", data, ticketSupportData);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
// Export each function individually
module.exports = {
  getQuestionData,
  upadteQuestion,
};
