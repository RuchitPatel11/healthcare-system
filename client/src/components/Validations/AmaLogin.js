// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Joi from 'joi';
// import { useForm } from 'react-hook-form';
// import { joiResolver } from '@hookform/resolvers/joi';
// import GlobalWrapper from './GlobalWrapper';
// import FormField from './Register/FormField';
// import { useAuth } from '../hooks/useAuth';

// const loginSchema = Joi.object({
//   email: Joi.string()
//     .email({ tlds: { allow: false } })
//     .required(),
//   password: Joi.string().required(),
// });

// function Login() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm({
//     mode: 'all',
//     resolver: joiResolver(loginSchema),
//   });
//   const { dispatch } = useAuth();

//   // Handle form submission
//   const onSubmit = async (data) => {
//     try {
//       const res = await axios.post('/api/users/login', data);
//       // eslint-disable-next-line no-console
//       if (res.status === 200) {
//         dispatch({ type: 'loggedIn', payload: res.data });
//       }
//     } catch (error) {
//       const res = error.response;

//       // Handle Errors
//       if (res.status === 401) {
//         setError(
//           'email',
//           { type: 'manual', message: 'Invalid username or password' },
//           { shouldFocus: true }
//         );
//       }

//       if (res.status === 400) {
//         res.data.error.forEach((e) => {
//           setError(
//             e.context.key,
//             { type: e.type, message: e.message },
//             { shouldFocus: true }
//           );
//         });
//       }
//     }
//   };
//   return (
//     <GlobalWrapper className="container -mt-14 flex h-[80vh] flex-col items-center justify-center pt-14 text-center lg:-mt-0 lg:h-[85vh] lg:pt-20">
//       <div className="bg-secondary w-screen p-5 md:w-auto lg:p-10">
//         <div className="mb-5">
//           <h1 className="mb-5 text-center text-3xl">Login</h1>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="mb-2 flex flex-col gap-2 text-left">
//               <FormField
//                 register={register('email')}
//                 error={errors.email}
//                 placeholder="Email address"
//               />
//               <FormField
//                 error={errors.password}
//                 register={register('password')}
//                 placeholder="Password"
//                 type="password"
//               />
//             </div>
//             {/* TODO: Forgot password */}
//             <div className="text-right">
//               <Link
//                 to="/"
//                 className="text-blue hover:underline hover:decoration-dotted"
//               >
//                 Forgot password?
//               </Link>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue px-4 py-3 transition  hover:text-white"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//         <div className="flex flex-col">
//           <span>New to Prime Video? </span>
//           <Link to="../register" className="">
//             <button type="button" className="w-full bg-light p-2 text-primary">
//               Create your Prime account
//             </button>
//           </Link>
//         </div>
//       </div>
//     </GlobalWrapper>
//   );
// }
// export default Login;
