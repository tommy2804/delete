const content = `This is an interavtive conding invierment. You can write code and see the result of it live. You can also test your code and see the result of it live.
 
 Click any text cell to edit it.
the code in each code editor is all joind together into one file if you define a variable. 

 you can show any react compenent, string, number, or anything else by calling the "show" function this is a function built into this enciorment. Call show multiple times to show multiple things. 
 
 You can also import any npm package you want to use in your code. 

 add new cells by hovering the buttons between each cell 
  All of your changes get saved to the file you opened
  gotypejs with.
   so if you ran npx gotypejs serve test.js , all of the text and code you write will be saved to the test.js file.
  `;

const app = `
import { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Increment
            </button>
            <button onClick={() => setCount(count - 1)}>Decrement
            </button>
            <h3>Count: {count}</h3>
        </div>
    );
};

show(<Counter />);
`;
