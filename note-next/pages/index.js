import Link from "next/link";
import { Card, Button, CardContent, CardHeader } from "semantic-ui-react";

export default function Index({ notes }) {
  return (
    <div className="notes-container">
      <h1> Notes</h1>

      <div className=" grid wrapper">
        {notes.map((note) => {
          return (
            <div key={note._id}>
              <Card>
                <Card.Content>
                  {" "}
                  <Card.Header>
                    <Link href={`/${note._id}`}>
                      <a> {note.title}</a>
                    </Link>
                  </Card.Header>
                </Card.Content>
                <CardContent extra>
                  <Link href={`/${note._id}`}>
                    <Button primary>View</Button>
                  </Link>
                  <Link href={`/${note._id}/edit`}>
                    <Button primary>Edit</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/notes");
  const { data } = await res.json();
  return { props: { notes: data } };
}
