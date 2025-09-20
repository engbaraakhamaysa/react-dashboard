import Form from "./Components/Forms/Form";

export default function CreatUser() {
  return (
    <div className="parent">
      <Form
        action={`post`}
        endPoint="user/create"
        navigate="/dashboard/users"
        buttonstyle={true}
        button="Create"
      />
    </div>
  );
}
