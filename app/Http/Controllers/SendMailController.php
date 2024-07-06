<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; 
use Resend\Client;
use Exception;

/**
 * メール送信コントローラークラス
 */
class SendMailController extends Controller
{
    /**
     * @var Client Resend クライアントインスタンス(DI)
     */
    protected $resendClient;

    /**
     * コンストラクタ
     * 
     * @param Client $resendClient Resend クライアントインスタンス
     */
    public function __construct(Client $resendClient)
    {
        $this->resendClient = $resendClient;
    }

    /**
     * メール送信
     * 
     * @param Request $request HTTPリクエストオブジェクト
     * @return \Illuminate\Http\JsonResponse メール送信の結果を含むJSONレスポンス
     * @throws Exception 送信エラーが発生した場合
     */
    public function sendMail(Request $request)
    {
        // CORS対策
        $CORS_ADDRESS        = env('CORS_ADDRESS');
        $RESEND_MAIL_ADDRESS = env('RESEND_MAIL_ADDRESS');
        $RESEND_NAME         = env('RESEND_NAME');

        // バリデーション
        $request->validate([
            'username' => 'required|string',
            'email' => 'required|email',
            'subject' => 'required|string',
            'content' => 'required|string',
            'file' => 'nullable|file'
        ]);

        Log::info('Request data validation OK.');

        // ここでリクエストからデータを取り出す
        $username = $request->input('username');
        $email    = $request->input('email');
        $subject  = $request->input('subject');
        $content  = $request->input('content');
        $file     = $request->file('file');

        // 添付ファイル
        $attachments = [];
        if ($file) {
            Log::info('file is not null.');
            $attachments[] = [
                'filename' => $file->getClientOriginalName(),
                'content' => base64_encode(file_get_contents($file->getPathname())),
                'type' => $file->getMimeType()
            ];
        }

        try {
            Log::info('Sending email...');
            $htmlContent = view('emails.template', compact('username', 'email', 'content'))->render();

            Log::info('Email content generated.');

            $emailData = [
                'from' => "$username@resend.dev",
                'to' => $RESEND_MAIL_ADDRESS,
                'subject' => $subject,
                'html' => $htmlContent,
                'text' => strip_tags($htmlContent),
            ];

            if (!empty($attachments)) {
                Log::info('Attachments found');
                $emailData['attachments'] = $attachments;
            }

            Log::info('Attachments found');
            $this->resendClient->emails()->send($emailData);
            Log::info('Email sent successfully.');

            return response()->json(['message' => 'Email sent successfully.']);
        } catch (Exception $e) {
            Log::error('Failed to send email: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
