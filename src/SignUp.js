export default function SignUp() {
  return (
    <div className="parent">
      <div className="register">
        <form>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" placeholder="Name..." />

          <label htmlFor="email">Email:</label>
          <input id="email" type="email" placeholder="Email..." required />

          <label htmlFor="password">Password:</label>
          <input id="password" type="password" placeholder="Password..." />

          <label htmlFor="repeat">Repeat Password:</label>
          <input id="repeat" type="password" placeholder="Repeat Password..." />

          <div style={{ textAlign: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
