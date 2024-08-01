import React, { useEffect, useState } from 'react';

function App() {
  const [flag, setFlag] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlag() {
      try {
        // Fetch the HTML content from the challenge URL
        const response = await fetch('https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge');
        const text = await response.text();
        const parser = new DOMParser();
        const documents = parser.parseFromString(text, 'text/html');

        // Extract characters from the specific elements
        const charElements = documents.querySelectorAll('code[data-class^="23"] div[data-tag$="93"] span[data-id*="21"] i.char');
        let url = '';
        charElements.forEach((el) => {
          url += el.getAttribute('value');
        });

        // Fetch the flag using the constructed URL
        const flagResponse = await fetch(url);
        const flagText = await flagResponse.text();
        let j=0,word='';
        let I=setInterval(()=>{
          setFlag(word+=flagText[j])
          j+=1
          if (j===flagText.length)
            clearInterval(I);
        },1000)
      } catch (error) {
        console.error('Error fetching the flag:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFlag();
  }, []);

  return (
      <div>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <ul>
              {flag}
            </ul>
        )}
      </div>
  );
}

export default App;
