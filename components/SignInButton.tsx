import Link from "next/link";
import { BiCaretDown } from "react-icons/bi";

const SignInButton = () => {
  return (
    <div className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]">
      <Link href="/login" className="text-left text-white font-semibold md:text-gray-100 md:font-normal">
        Hello, sign in
      </Link>

      <Link
        href="/login"
        className="text-white font-bold hidden md:flex items-center"
      >
        Account & Lists <span><BiCaretDown /></span>
      </Link>
    </div>
  );
};

export default SignInButton;


// import { signIn } from "@/auth";
// import { BiCaretDown } from "react-icons/bi";

// const SignInButton = () => {
//   return (
//     <form
//       action={async () => {
//         "use server";
//         await signIn();
//         // await signIn("google", { redirectTo: "/" });
//       }}
//       className="text-xs text-gray-100 flex flex-col justify-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
//     >
//       <button
//        className="text-left text-white font-semibold md:text-gray-100 md:font-normal">
//         Hello, sign in
//       </button>

//       <button
//         type="submit"
//         className="text-white font-bold hidden md:flex items-center"
//       >
//         Account & Lists{" "}
//         <span>
//           <BiCaretDown />
//         </span>
//       </button>
//     </form>
//   );
// };

// export default SignInButton;
