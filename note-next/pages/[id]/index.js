import { useState, useEffect } from "react";
import { Confirm, Button, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import Notes from "../../models/Note";
import dbConnect from "../../utils/dbConnect";

const Note = ({ note }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting]);

  const open = () => setConfirm(true);

  const close = () => setConfirm(false);

  const deleteNote = async () => {
    const noteId = router.query.id;
    try {
      const deleted = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: "Delete",
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  };
  const newNote = JSON.parse(note);
  return (
    <div className="note-container">
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{newNote.title}</h1>
          <p>{newNote.description}</p>
          <Button color="red" onClick={open}>
            Delete
          </Button>
        </>
      )}
      <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
    </div>
  );
};
export async function getServerSideProps({ query: { id } }) {
  dbConnect();
  const note = await Notes.findById(id);
  return {
    props: { note: JSON.stringify(note) },
  };
}

// Note.getInitialProps = async ({ query: { id } }) => {
//   const res = await fetch(`http://localhost:3000/api/notes/${id}`);
//   const { data } = await res.json();

//   return { note: data };
// };
export default Note;
