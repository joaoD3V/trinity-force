export interface Props {
  imageURL: string;
}

function NudgeImage({imageURL}: Props) {
  return <img src={imageURL} alt="" className="w-20 h-20 group-hover:scale-105 transition-transform"/>
}

export default NudgeImage;
