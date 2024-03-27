# Sista: Voice UI Controller


🔊 Unleash the power of voice 🎤 in your React apps with `@sista/vuic-react` 🚀

This tiny, AI-powered library lets you build voice-enabled apps without any code changes!!

 All you need is 1 `config` file, _(auto-generated by the [admin dashboard](https://admin.sista.ai))_, informing our powerful AI model what `functions` it can call. 

Dive into this mini guide and discover how to integrate voice functionality seamlessly into your React projects in **less than 10 min**!


## Installation

To use [@sista/vuic-react](https://www.npmjs.com/package/@sista/vuic-react), install it via `npm` or `yarn` or `pnpm` in your React App.

```bash
# install with npm
npm install @sista/vuic-react

# Or with yarn
yarn add @sista/vuic-react

# Or with pnpm
pnpm add @sista/vuic-react
```

## Setup

1. Import `VuicProvider`:

```jsx
import { VuicProvider } from "@sista/vuic-react";
```

2. Wrap your main component:

```jsx
<VuicProvider apiKey="YOUR_API_KEY">
  {/* Your main component */}
</VuicProvider>
```

3. Add your API KEY

Replace `"YOUR_API_KEY"` with your actual API key. 

Obtain your FREE API key from the [admin dashboard](https://admin.sista.ai/applications). _(or visit admin.sista.ai)_

Example:

```jsx
// ...
import { VuicProvider } from "@sista/vuic-react";

ReactDOM.render(
  <React.StrictMode>
    <VuicProvider apiKey="YOUR_API_KEY"> // << Wrap your app with this
      <App />
    </VuicProvider>
  </React.StrictMode>,
  // ...
);
```


### 2. Import and Use the Voice Button

Import `VuicButton` from `@sista/vuic-react` and add it to your component.

```js
// ...
import { VuicButton } from "@sista/vuic-react";

// ...

function MyComponent() {
  return (
    <div>
      {/* Other UI elements */}
      <VuicButton />
    </div>
  );
}
```

🎉 Congratulations! Almost done. Now you can start talking with your app. Just press the button and enjoy the experience. 😊👍

### 3. Configuration: Control Your UI

Let's define what your AI voice assistant can do!

#### A. Function Signature Structure

The `functionSignature` object outlines the functions your app can perform. Each function has a name, description, and parameters.

_You can auto-generated this config file in the [admin dashboard](https://admin.sista.ai)_.

```js
const functionSignatures = [
  {
    type: 'function',
    function: {
      name: 'functionName',
      description: 'What the function does',
      parameters: {
        type: 'object',
        properties: {
          paramName: {
            type: 'string',
            description: 'What the parameter does',
          },
        },
        required: ['paramName'],
      },
    },
  },
  // Add more function signatures as needed
];

```

#### B. Function References Structure

The `functionReferences` array contains references to the actual functions that are called when the corresponding voice command is recognized.

```js
const functionReferences = [
  functionName1,
  functionName2,
  // Add more function references as needed
];
```

#### C. Register Your Function

Register your voice-activated functions by passing two arguments to `vuic.registerFunctions`:

1. `functionSignatures` is an array of objects.
2. `functionReferences` is an array of function references.

```js
const vuic = useVuic();
vuic.registerFunctions(functionSignatures, functionReferences);
```

This registration should be done inside a `useEffect` hook to ensure it only runs once after the component mounts.

#### Todo App Example

In a todo app, users could add and remove tasks with their voice. Here's how to set this up:

# Example 

```js
// ...
import { useVuic, useEffect } from '@sista/vuic-react';

function TodoApp() {
  const addTask = (taskDescription) => {
    console.log(`Added task: ${taskDescription}`);
  };

  const removeTask = (taskDescription) => {
    console.log(`Removed task: ${taskDescription}`);
  };

  // Define function signatures
  const functionSignatures = [
    {
      type: 'function',
      function: {
        name: 'addTask',
        description: 'Adds a task to the todo list.',
        parameters: {
          type: 'object',
          properties: {
            taskDescription: {
              type: 'string',
              description: 'The task description.',
            },
          },
          required: ['taskDescription'],
        },
      },
    },
    {
      type: 'function',
      function: {
        name: 'removeTask',
        description: 'Removes a task from the todo list.',
        parameters: {
          type: 'object',
          properties: {
            taskDescription: {
              type: 'string',
              description: 'The task description.',
            },
          },
          required: ['taskDescription'],
        },
      },
    },
  ];

  // Define function references
  const functionReferences = [
    addTask,
    removeTask,
  ];

  const vuic = useVuic();
  useEffect(() => {
    if (vuic) {
    vuic.registerFunctions(functionSignatures, functionReferences);
    }
  }, [vuic]);

  return <div>{/* TodoApp UI elements here */}</div>;
}
```

## Basic Usage

The basic usage involves three key steps:

1. **Initiate the SDK (`VuicProvider`):** Wrap your app with `VuicProvider` and provide your API key to initialize the voice functionality.
2. **Import Voice Button (`<VuicButton />`):** Use the `VuicButton` component in your UI to give users the ability to interact with voice commands.
3. **Write Your Config File:** Define and register your voice-activated functions using `vuic.registerFunctions(functionSignatures, functionReferences);` to make them accessible through voice commands.


## Contributing

We welcome contributions to Sista Voice UI Controller! Please see our [contributing guide](LINK_TO_CONTRIBUTING_GUIDE).

## License

Sista Voice UI Controller is [MIT licensed](./LICENSE).

## Support

If you're having a problem with this package, please raise an issue on Github or contact us at [support@sista.ai](mailto:support@sista.ai).