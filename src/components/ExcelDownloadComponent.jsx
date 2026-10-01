import Button from '@mui/material/Button';
import React, { useState } from 'react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const ExcelDownloadComponent = () => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState(null);

    const handleDownload = async () => {
        setIsDownloading(true);
        setError(null);

        try {
            // Make the fetch call to your backend endpoint
            const response = await fetch('http://localhost:8080/api/v5/downloadAll', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
            });

            // Check if the response was successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Get the response body as a Blob
            const blob = await response.blob();

            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(blob);

            // Get the suggested filename from the Content-Disposition header
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = 'employees.xlsx'; // Default filename
            if (contentDisposition) {
                const matches = /filename="([^"]+)"/.exec(contentDisposition);
                if (matches != null && matches[1]) {
                    filename = matches[1];
                }
            }

            // Create a link element
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();

            // Clean up by revoking the temporary URL
            window.URL.revokeObjectURL(url);
            a.remove();

        } catch (err) {
            setError(err.message);
            console.error('Download failed:', err);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className='grid place-content-center p-2'>            
            <Button variant="contained" startIcon={<CloudDownloadIcon />} onClick={handleDownload}
                disabled={isDownloading}>
                {isDownloading ? 'Downloading...' : 'Download'}
            </Button>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};

export default ExcelDownloadComponent;
