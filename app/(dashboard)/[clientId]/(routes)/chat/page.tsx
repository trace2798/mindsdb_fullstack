

import ConversationForm from "./components/chat-form";

const ConversationPage = ({ params }: { params: { clientId: string } }) => {
  return (
    <div>
      <ConversationForm />
    </div>
  );
};

export default ConversationPage;
