// Export all hooks
export * from './hooks/useLocalStorage';
export * from './hooks/useFetch';
export * from './hooks/useDarkMode';

// Export hook metadata for the CLI and web app
export const hooks = [
  {
    name: 'useLocalStorage',
    description: 'A hook for storing and retrieving values from localStorage',
    category: 'Storage',
    examples: [
      {
        name: 'Basic Usage',
        code: `
const [name, setName] = useLocalStorage('name', 'John');

// Update the name
setName('Jane');
        `
      }
    ]
  },
  {
    name: 'useFetch',
    description: 'A hook for making HTTP requests with fetch API',
    category: 'Data Fetching',
    examples: [
      {
        name: 'Basic Usage',
        code: `
const { data, loading, error } = useFetch('https://api.example.com/data');

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;
return <div>{JSON.stringify(data)}</div>;
        `
      }
    ]
  },
  {
    name: 'useDarkMode',
    description: 'A hook for managing dark mode in your application',
    category: 'UI',
    examples: [
      {
        name: 'Basic Usage',
        code: `
const [isDarkMode, toggleDarkMode] = useDarkMode();

return (
  <button onClick={toggleDarkMode}>
    {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
  </button>
);
        `
      }
    ]
  }
];