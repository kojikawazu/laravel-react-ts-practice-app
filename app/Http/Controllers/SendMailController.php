<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Resend\Laravel\Facades\Resend;
use Exception;

class SendMailController extends Controller
{
    public function sendMail(Request $request)
    {
        $CORS_ADDRESS        = env('CORS_ADDRESS');
        $RESEND_MAIL_ADDRESS = env('RESEND_MAIL_ADDRESS');
        $RESEND_NAME         = env('RESEND_NAME');

        // ここでリクエストからデータを取り出す
        $username = $request->input('username');
        $email    = $request->input('email');
        $subject  = $request->input('subject');
        $content  = $request->input('content');
        $file     = $request->file('file');

        // 添付ファイル
        $attachments = [];
        if ($file) {
            $attachments[] = [
                'filename' => $file->getClientOriginalName(),
                'content' => base64_encode(file_get_contents($file->getPathname())),
                'type' => $file->getMimeType()
            ];
        }

        try {
            Resend::emails()->send([
                    'from' => "$username@resend.dev",
                    'to' => $RESEND_MAIL_ADDRESS,
                    'subject' => $subject,
                    'html' => view('emails.template', compact('username', 'email', 'content'))->render(),
                    'text' => strip_tags($htmlContent),
                    'attachments' => $attachments,
                ]);

            return response()->json(['message' => 'Email sent successfully.'])
                ->header('Access-Control-Allow-Origin', $CORS_ADDRESS)
                ->header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()])
                ->header('Access-Control-Allow-Origin', $CORS_ADDRESS)
                ->header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        }
    }
}
