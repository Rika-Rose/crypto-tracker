import logo from '../assets/cryptologo.png';

export default function Header() {
  return (
    <div className="bg-[#07111B] h-24 flex items-center justify-center">
  <img src={logo} alt="Logo" className="h-full w-auto object-contain" />
</div>
  )
}