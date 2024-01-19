import { getGptGeniusUser, getGptGeniusUserTokenAmount } from "@/utils/actions";
import { UserProfile, currentUser } from "@clerk/nextjs";

const ProfilePage = async () => {
  const user = await currentUser();
  const userEmail = user.emailAddresses[0].emailAddress;
  const { user_id: userId } = await getGptGeniusUser(userEmail);
  const currentTokens = await getGptGeniusUserTokenAmount(userId);
  return (
    <div>
      <h2 className="mb-8 ml-8 text-xl font-extrabold">
        Token Amount : {currentTokens}
      </h2>
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
