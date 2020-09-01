import { useState, useEffect } from "react";
import { Form, Button, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import Notes from "../../models/Note";
import dbConnect from "../../utils/dbConnect";

const editNote = ({ note }) => {
  const newNote = JSON.parse(note);

  const [form, setForm] = useState({
    title: newNote.title,
    description: newNote.description,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateNote();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const updateNote = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/notes/${router.query.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let err = {};

    if (!form.title) {
      err.title = "Title is required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }

    return err;
  };
  return (
    <div className="form-container">
      <h1>Update Note</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              error={
                errors.title
                  ? { content: "Please enter a title", pointing: "below" }
                  : null
              }
              label="Title"
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            <Form.TextArea
              fluid
              label="Descriprtion"
              placeholder="Description"
              name="description"
              value={form.description}
              error={
                errors.description
                  ? { content: "Please enter a description", pointing: "below" }
                  : null
              }
              onChange={handleChange}
            />
            <Button type="submit">Update</Button>
          </Form>
        )}
      </div>
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

export default editNote;
