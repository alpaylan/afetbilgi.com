import { useNavigate } from "react-router-dom";

export default function BloodDonationData() {
  const navigate = useNavigate();
  window.open('https://www.kanver.org/KanHizmetleri/KanBagisiNoktalari', '_blank');
  navigate("/");
  return <></>;
}
