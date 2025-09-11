import fileIcon from "../../assets/file-icon.svg";
import commentIcon from "../../assets/comment-icon.svg";

export const Card = () => {
  return (
    <div className="rounded-xl bg-neutral-200 p-3 text-neutral-50">
      <div className="mb-3 flex justify-between">
        <span className="">Slack</span>
        <img src="" alt="three dots" />
      </div>
      <div className="mb-2 flex justify-between">
        <span>4 points</span>
        <div>TODAY</div>
      </div>
      <div className="mb-2 flex justify-between">
        <img src="" alt="profile"></img>
        <div className="flex flex-row items-center">
          <img src={fileIcon} alt="file" className="mr-4"></img>
          <span>5</span>
          <img src={fileIcon} alt="commits" className="mr-4"></img>
          <span>3</span>
          <img src={commentIcon} alt="comments"></img>
        </div>
      </div>
    </div>
  );
};
