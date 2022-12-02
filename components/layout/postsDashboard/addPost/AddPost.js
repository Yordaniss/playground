import AgeInput from "../../searchManagement/AgeInput";
import { server } from "../../../../config/index";
import { useForm } from "react-hook-form";
import CategoryDropdown from "./CategoryDropdown";
import { useSelector, useDispatch } from "react-redux";
import { addPostActions } from "../../../../store/index";

// export default function AddPost({ action = `${server}/api/posts}` }) {
//   const [formValues, setFormValues] = useState({
//     title: "",
//     text: "",
//     additionalInfo: "",
//     category: null,
//     age: 0,
//     file: null,
//   });

//   const selectionHandler = (el) => {
//     if (el.option.property === "main_category") {
//       let e = undefined;
//       categoryChangeHandler(e, el);
//     }
//   };

//   // const {
//   //   value: title,
//   //   isValid: titleIsValid,
//   //   hasError: titleHasError,
//   //   valueChangeHandler: titleChangeHandler,
//   //   inputBlurHandler: titleInputBlurHandler,
//   //   reset: resetTitleInput,
//   // } = useInput((value) => value.trim() !== "");

//   // const {
//   //   value: additionalInfo,
//   //   isValid: additionalInfoIsValid,
//   //   hasError: additionalInfoHasError,
//   //   valueChangeHandler: additionalInfoChangeHandler,
//   //   inputBlurHandler: additionalInfoBlurHandler,
//   //   reset: resetadditionalInfoInput,
//   // } = useInput((value) => value.trim() !== "");

//   // const {
//   //   value: text,
//   //   isValid: textIsValid,
//   //   hasError: textHasError,
//   //   valueChangeHandler: textChangeHandler,
//   //   inputBlurHandler: textBlurHandler,
//   //   reset: resetTextarea,
//   // } = useInput((value) => value.trim() !== "");

//   // const {
//   //   value: category,
//   //   isValid: categoryIsValid,
//   //   hasError: categoryHasError,
//   //   valueChangeHandler: categoryChangeHandler,
//   //   inputBlurHandler: categoryBlurHandler,
//   //   reset: resetCategory,
//   // } = useInput((value) => value !== undefined);

//   let isFormValid = false;

//   if (titleIsValid) {
//     isFormValid = true;
//   } else {
//     isFormValid = false;
//   }

//   useEffect(() => {
//     const sendPostCallback = (sendingResult, postTitle) => {
//       setPosts(fetchResult.data);
//       // props.onAddPost();
//     };
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // sendPost(
//     //   {
//     //     url: "http://localhost:3000/api/posts",
//     //     method: "POST",
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //     },
//     //     body: {
//     //       title: "hi",
//     //       main_category: 2,
//     //       age_category: 6,
//     //       components: [
//     //         ["Required items", ["rock", "paper", "scissors"]],
//     //         ["Instruction", ["Die"]],
//     //       ],
//     //     },
//     //   },
//     //   sendPostCallback()
//     //   // sendPostCallback.bind(null, postTitle)
//     // );

//     // if (!isFormValid) {
//     //   return;
//     // }
//     // resetTitleInput();
//     // resetAdditionalInfoInput();
//     // resetTextarea();
//     // resetCategory();

//     const payload = {
//       title,
//       additionalInfo,
//       text,
//       category,
//     };
//     console.log(payload);
//   };

//   const { isLoading, error, sendRequest: sendPost } = useHttpRequest();

//   return (
//     <div className="outer-container">
//       <form
//         action={action}
//         method="POST"
//         className="form addPost"
//         onSubmit={handleSubmit}
//       >
//         {isLoading && <p>{isLoading}</p>}
//         {error && <p>{error}</p>}
//         <div className="addPost__inner-container">
//           <label className="labelForTitleInput" htmlFor="inputPostTitle">
//             Post title:
//           </label>
//           <input
//             className={`input ${titleHasError ? "input-error" : ""}`}
//             onChange={titleChangeHandler}
//             onBlur={titleInputBlurHandler}
//             id="inputPostTitle"
//             type="text"
//             defaultValue={title}
//             placeholder="Title is..."
//           />
//           <label className="labelForTextarea">Text of the post: </label>
//           <textarea
//             placeholder="Your funny activiy..."
//             className={`textarea ${textHasError ? "textarea-error" : ""}`}
//             minLength="50"
//             defaultValue={text}
//             onChange={textChangeHandler}
//             onBlur={textBlurHandler}
//           />
//           <label className="labelForAgeInput">Enter child's age: </label>
//           <AgeInput></AgeInput>
//           <Dropdown
//             //add has error
//             className={`dropdown`}
//             dropdownList={dropdownList}
//             selectionModifier="POST"
//             onSelect={(el) => selectionHandler(el)}
//             onBlur={categoryBlurHandler}
//           ></Dropdown>
//           <label className="button custom-file-input" htmlFor="chooseFile">
//             Choose file
//           </label>
//           <input id="chooseFile" type="file" />
//           <label
//             className="labelForAdditionalInfoInput"
//             htmlFor="inputAdditionalInfo"
//           >
//             Additional info:
//           </label>
//           <input
//             className={`input ${additionalInfoHasError ? "input-error" : ""}`}
//             id="inputAdditionalInfo"
//             type="text"
//             defaultValue={additionalInfo}
//             placeholder="Your additional info..."
//             onChange={additionalInfoChangeHandler}
//             onBlur={additionalInfoBlurHandler}
//           />
//         </div>
//         <div className="formButtons">
//           <input
//             disabled={!isFormValid}
//             className="button submit"
//             type="submit"
//             value="submit post"
//           />
//           <input type="reset" value="cancel" className="button cancel" />
//         </div>
//       </form>
//     </div>
//   );
// }

export default function AddPost({ action = `${server}/api/posts}` }) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const categoryState = useSelector(({ addPost }) => addPost.category.value);
  // console.log(categoryState);

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  return (
    <div className="outer-container">
      <form
        action={action}
        method="POST"
        className="form addPost"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        {/* {isLoading && <p>{isLoading}</p>} */}
        {/* {error && <p>{error}</p>} */}
        <div className="addPost__inner-container">
          <label className="labelForTitleInput" htmlFor="inputPostTitle">
            Post title:
          </label>
          <input
            className={`input`}
            id="inputPostTitle"
            type="text"
            placeholder="Title is..."
            {...register("title")}
          />
          <label className="labelForTextarea">Text of the post: </label>
          <textarea
            placeholder="Your funny activiy..."
            className={`textarea`}
            // minLength="50"
            {...register("text")}
          />
          <label className="labelForAgeInput">Enter child's age: </label>
          <AgeInput></AgeInput>
          <CategoryDropdown
            onClick={() => setValue("category", { value: categoryState })}
          ></CategoryDropdown>
          <label className="button custom-file-input" htmlFor="chooseFile">
            Choose file
          </label>
          <input id="chooseFile" type="file" />
          <label
            className="labelForAdditionalInfoInput"
            htmlFor="inputAdditionalInfo"
          >
            Additional info:
          </label>
          <input
            className={`input`}
            id="inputAdditionalInfo"
            type="text"
            placeholder="Your additional info..."
          />
        </div>
        <div className="formButtons">
          <input
            disabled={!true}
            className="button submit"
            type="submit"
            value="submit post"
          />
          <input type="reset" value="cancel" className="button cancel" />
        </div>
      </form>
    </div>
  );
}
