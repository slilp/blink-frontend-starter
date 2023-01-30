import { withSessionSsr } from "../lib/withSession";

interface User {
  id?: string;
  name?: string;
}
const PrivatePage = ({ user }: { user: User }) => (
  <div>
    <h1>Hello {user.name}</h1>
    <p>Secret Content</p>
  </div>
);

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    if (!user) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        user: req.session.user,
      },
    };
  }
);

export default PrivatePage;
