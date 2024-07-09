import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not set in environment variables.');
    return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
  }

  let postData;
  try {
    postData = req.body; // Assuming body-parser or similar middleware is used
  } catch (error) {
    console.error('Error parsing JSON body:', error);
    return NextResponse.json({ success: false, error: 'Bad request' }, { status: 400 });
  }

  const { gRecaptchaToken } = postData;
  console.log('gRecaptchaToken:', gRecaptchaToken); 
  // Define the form data for the POST request to the ReCaptcha API.
  const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;
  console.log('Form data sent to reCAPTCHA:', formData); 
  try {
    // Make a POST request to the Google ReCaptcha verify API.
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    console.log('reCAPTCHA API response:', response.data); 
    // Check the ReCaptcha response for success and a score above a certain threshold.
    if (response.data.success && response.data.score > 0.5) {
      console.log('ReCaptcha score:', response.data.score);
      // Return a success response if the verification passes.
      return res.status(200).json({
        success: true,
        score: response.data.score,
      });
    } else {
      // Log the failure and return a response indicating the verification did not pass.
      console.error('ReCaptcha verification failed:', response.data);
      return NextResponse.json({ success: false, error: 'ReCaptcha verification failed' }, { status: 403 });
    }
  } catch (error) {
    // Handle any errors that occur during the API request.
    console.error('Error during ReCaptcha verification:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
