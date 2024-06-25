<?php

namespace Tests\Unit\Models;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserTest extends BaseTestCase
{
    use RefreshDatabase;

    // ユーザーが正しく作成されるかテスト
    public function test_user_can_be_created(): void
    {
        $userData = [
            'name' => 'Haru',
            'email' => 'haru@example.com',
            'password' => 'password123',
        ];

        $user = User::create($userData);

        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals($userData['name'], $user->name);
        $this->assertEquals($userData['email'], $user->email);
        $this->assertDatabaseHas('users', ['email' => 'haru@example.com']);
    }

    // ユーザーのパスワードがハッシュ化されるかをテスト
    public function test_user_password_is_hashed(): void
    {
        $userData = [
            'name' => 'Haru',
            'email' => 'haru@example.com',
            'password' => 'password123',
        ];

        $user = User::create($userData);

        $this->assertNotEquals($userData['password'], $user->password);
        $this->assertTrue(Hash::check($userData['password'], $user->password));
    }

    // ユーザーが正しく更新されるかテスト
    public function test_user_can_be_updated(): void
    {
        $user = User::factory()->create();
        $updatedData = [
            'name' => 'Haru Updated',
            'email' => 'haru.updated@example.com'
        ];

        $user->update($updatedData);

        $this->assertEquals($updatedData['name'], $user->name);
        $this->assertEquals($updatedData['email'], $user->email);
        $this->assertDatabaseHas('users', ['email' => 'haru.updated@example.com']);
    }

    // ユーザーが正しく削除されるかテスト
    public function test_user_can_be_deleted(): void
    {
        $user = User::factory()->create();
        $userId = $user->id;

        $user->delete();

        $this->assertDatabaseMissing('users', ['id' => $userId]);
    }

    // ユーザーが投稿を持っているかテスト
    public function test_user_has_posts(): void
    {
        $user = User::factory()->create();
        
        $this->assertIsObject($user->posts());
        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Relations\HasMany::class, $user->posts());
    }

    // ユーザーがいいねを持っているかテスト
    public function test_user_has_likes(): void
    {
        $user = User::factory()->create();
        
        $this->assertIsObject($user->likes());
        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Relations\HasMany::class, $user->likes());
    }

     // ユーザーが返信を持っていかテスト
    public function test_user_has_replies(): void
    {
        $user = User::factory()->create();
        
        $this->assertIsObject($user->replies());
        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Relations\HasMany::class, $user->replies());
    }

    // ユーザー作成時のバリデーションエラーテスト
    public function test_user_creation_validation_errors(): void
    {
        $this->expectException(\Illuminate\Database\QueryException::class);

        User::create(['name' => null, 'email' => 'invalid-email', 'password' => '']);
    }
}