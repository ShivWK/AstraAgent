import AgentDetails from './AgentDetails';
import PreviousChats from './PreviousChats';

const AISideBar = () => {
  return (
    <div className="section__agent rounded-primary flex h-full w-full flex-col pb-2">
      <AgentDetails />
      <PreviousChats />
    </div>
  );
};

export default AISideBar;
