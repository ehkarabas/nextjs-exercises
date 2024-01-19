import { UserButton, currentUser, auth } from "@clerk/nextjs";
import {
  getGptGeniusUser,
  createGptGeniusUser,
  createTokenForGptGeniusUser,
} from "@/utils/actions";

const MemberProfile = async () => {
  const user = await currentUser();
  const userEmail = user.emailAddresses[0].emailAddress;
  console.log("userEmail: ", userEmail);
  const gptGeniusUser = await getGptGeniusUser(userEmail);
  console.log("gptGeniusUser: ", gptGeniusUser);
  if (!gptGeniusUser) {
    const { userId } = await auth();
    const userName =
      user.firstName && user.lastName && user.firstName + " " + user.lastName;
    const gptGeniusUser = await createGptGeniusUser(
      userId,
      userEmail,
      userName
    );
    const gptGeniusUserToken = await createTokenForGptGeniusUser(
      gptGeniusUser.user_id
    );
  }
  const formatEmail = (email) => {
    const atIndex = email.indexOf("@");
    if (atIndex < 3) {
      return email;
    } else {
      return email.slice(0, 3) + "..." + email.slice(atIndex);
    }
  };
  return (
    <div className="px-4 flex items-center gap-2">
      <UserButton afterSignOutUrl="/" />
      <p>{formatEmail(userEmail)}</p>
    </div>
  );
};

export default MemberProfile;
