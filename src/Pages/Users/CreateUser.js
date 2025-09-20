import Form from "../../Components/Form/Form";

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
