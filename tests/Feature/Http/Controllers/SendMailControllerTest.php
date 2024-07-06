<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use Mockery;
use Resend\Client;

class SendMailControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $mockResendClient;

    protected function setUp(): void
    {
        parent::setUp();

        // テストユーザーを作成(認証用)
        $this->user = User::factory()->create();
        $this->actingAs($this->user);

        // 環境変数の設定
        config(['app.env' => 'testing']);
        config(['RESEND_MAIL_ADDRESS' => 'test@example.com']);
        config(['RESEND_NAME' => 'Test User']);

        // Resendクライアントのモックを作成
        $this->mockResendClient = Mockery::mock(Client::class);
        // モックされたクライアントをDIコンテナにバインド
        $this->app->instance(Client::class, $this->mockResendClient);

         // テスト用ファイルストレージのセットアップ
         Storage::fake('local');
    }

    public function testSendMail()
    {
        // モックの設定
        $this->mockResendClient->shouldReceive('emails->send')
            ->once()
            ->andReturn(true);
        // テスト用ファイルの作成
        $file = UploadedFile::fake()->create('testfile.pdf', 100);

        // リクエストデータを設定
        $requestData = [
            'username' => 'testuser',
            'email' => 'user@example.com',
            'subject' => 'Test Subject',
            'content' => 'This is a test email.',
            'file' => $file,
        ];

        // メール送信
        $response = $this->json('POST', '/send-mail', $requestData);

        // レスポンステスト
        if ($response->status() !== 200) {
            dd($response->json());
        }

        $response->assertStatus(200)
            ->assertJson(['message' => 'Email sent successfully.']);
    }

    public function testSendMailFailure()
    {
        // モックの設定
        $this->mockResendClient->shouldReceive('emails->send')
            ->once()
            ->andThrow(new \Exception('Failed to send email'));
        // テスト用ファイルの作成
        $file = UploadedFile::fake()->create('testfile.pdf', 100);

        // リクエストデータを設定
        $requestData = [
            'username' => 'testuser',
            'email' => 'user@example.com',
            'subject' => 'Test Subject',
            'content' => 'This is a test email.',
            'file' => $file,
        ];

        // メール送信
        $response = $this->json('POST', '/send-mail', $requestData);

        // レスポンステスト
        $response->assertStatus(500)
            ->assertJson(['error' => 'Failed to send email']);
    }

    public function testSendMailWithoutAttachment()
    {
        // モックの設定
        $this->mockResendClient->shouldReceive('emails->send')
            ->once()
            ->andReturn(true);

        // リクエストデータを設定
        $requestData = [
            'username' => 'testuser',
            'email' => 'user@example.com',
            'subject' => 'Test Subject',
            'content' => 'This is a test email.',
            'file' => null,
        ];

        // メール送信
        $response = $this->json('POST', '/send-mail', $requestData);

        // レスポンステスト
        $response->assertStatus(200)
            ->assertJson(['message' => 'Email sent successfully.']);
    }

    public function testSendMailMissingFields()
    {
        // モックの設定
        $this->mockResendClient->shouldReceive('emails->send')
            ->never();

        // リクエストデータを設定（必須フィールド不足）
        $requestData = [
            'username' => 'testuser',
            // 'email' => 'user@example.com', // emailが不足している
            'subject' => 'Test Subject',
            'content' => 'This is a test email.',
            'file' => null,
        ];

        // メール送信
        $response = $this->json('POST', '/send-mail', $requestData);

        // レスポンステスト
        $response->assertStatus(422);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}