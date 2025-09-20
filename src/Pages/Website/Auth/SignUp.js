import Form from "../../../Components/Form/Form";
import Header from "../../../Components/Header";

export default function SignUp() {
  return (
    <>
      <Header />
      <div className="parent">
        <Form
          button="Register"
          action={`post`}
          endPoint="auth/signup"
          navigate="/"
          hasLocalStorage={true}
          styleReagister={true}
          form={true}
        />
      </div>
    </>
  );
}
