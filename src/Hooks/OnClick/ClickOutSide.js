import { useEffect, useRef } from 'react';

// Custom hook to detect outside clicks
export const ClickOutSide = (handler) => {
    const ref = useRef();

    useEffect(() => {
        // Function to handle outside click
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handler();  // Close dropdown when clicking outside
            }
        };

        // Adding event listener to document
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handler]);

    return { ref };  // Return the ref to attach to the element
};
