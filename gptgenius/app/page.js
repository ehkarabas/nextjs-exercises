import Link from "next/link";

const Home = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl lg:text-7xl font-bold text-primary">
            GPTGenius
          </h1>
          <p className="py-6 text-base lg:text-xl leading-loose">
            GPTGenius: Your AI language companion. Powered by OpenAI, it
            enhances your conversations, content creation, and more!
          </p>
          <Link
            href="/chat"
            className="btn btn-md lg:btn-lg btn-info capitalize"
          >
            get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
