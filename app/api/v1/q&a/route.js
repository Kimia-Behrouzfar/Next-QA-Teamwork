export const data = [
  {
    id: "1",
    title: "JS",
    description: "what is js?",
    createdTime: "11/1/2024, 5:52:14 PM",
    answers: [
      {
        ansText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam libero cupiditate nobis voluptas commodi ex porro corrupti officia.",
        id: "dfh5eh4",
      },
    ],
  },
  {
    id: "2",
    title: "HTML",
    description: "What is HTML?",
    createdTime: "10/24/2024, 2:25:34 PM",
    answers: [
      {
        ansText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam libero cupiditate nobis voluptas commodi ex porro corrupti officia.",
        id: "h54h45h",
      },
    ],
  },
  {
    id: "3",
    title: "CSS",
    description: "What is CSS?",
    createdTime: "11/1/2024, 3:17:12 PM",
    answers: [
      {
        ansText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam libero cupiditate nobis voluptas commodi ex porro corrupti officia.",
        id: "h45h5445",
      },
    ],
  },
  {
    id: "4",
    title: "React",
    description: "what is React?",
    createdTime: "10/15/2024, 4:34:54 PM",
    answers: [
      {
        ansText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam libero cupiditate nobis voluptas commodi ex porro corrupti officia.",
        id: "5h4h45y4h",
      },
    ],
  },
];

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(data);
}

export async function POST(req) {
  const body = await req.json();
  // id
  const arrId = data.map((el) => parseInt(el.id)).sort((a, b) => a - b);
  body.id = (arrId[arrId.length - 1] + 1).toString();
  // date
  const date = new Date().toLocaleString();
  body.createdTime = date;

  data.push(body);

  return Response.json(data);
}
