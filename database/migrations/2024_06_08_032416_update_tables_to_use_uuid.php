<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         // Ensure the uuid-ossp extension is enabled
         DB::statement('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

         // Update existing records with UUIDs
         DB::statement('UPDATE markdown_likes SET id = uuid_generate_v4() WHERE id IS NULL');
         
        // // UUIDカラムを追加
        // Schema::table('markdown_posts', function (Blueprint $table) {
        //     $table->uuid('uuid')->nullable()->unique()->first();
        // });

        // // 既存のデータにUUIDを設定
        // DB::statement('UPDATE markdown_posts SET uuid = uuid_generate_v4() WHERE uuid IS NULL');

        // // UUIDカラムをNOT NULLに変更
        // Schema::table('markdown_posts', function (Blueprint $table) {
        //     $table->uuid('uuid')->nullable(false)->change();
        // });

        // // --------------------------------------------------------------------------------------------

        // // 外部キー制約の削除
        // Schema::table('markdown_likes', function (Blueprint $table) {
        //     $table->dropForeign(['post_id']);
        // });
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->dropForeign(['post_id']);
        // });

        // // --------------------------------------------------------------------------------------------

        // // プライマリキーの変更の準備
        // Schema::table('markdown_posts', function (Blueprint $table) {
        //     $table->dropPrimary('id');
        // });

        // // UUIDをプライマリキーに設定
        // Schema::table('markdown_posts', function (Blueprint $table) {
        //     $table->primary('uuid');
        //     $table->dropColumn('id');
        //     $table->renameColumn('uuid', 'id');
        // });

        // // --------------------------------------------------------------------------------------------

        // // 新しいUUIDカラムを追加
        // Schema::table('markdown_likes', function (Blueprint $table) {
        //     $table->uuid('new_post_id')->nullable()->after('post_id');
        // });
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->uuid('new_post_id')->nullable()->after('post_id');
        // });

        // // 新しいUUIDカラムにデータを移行
        // DB::statement('UPDATE markdown_likes SET new_post_id = (SELECT id FROM markdown_posts WHERE markdown_posts.id::text = markdown_likes.post_id::text)');
        // DB::statement('UPDATE markdown_replies SET new_post_id = (SELECT id FROM markdown_posts WHERE markdown_posts.id::text = markdown_replies.post_id::text)');

        // // 新しいUUIDカラムをNOT NULLに変更
        // Schema::table('markdown_likes', function (Blueprint $table) {
        //     $table->uuid('new_post_id')->nullable(false)->change();
        // });
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->uuid('new_post_id')->nullable(false)->change();
        // });

        // // 古いpost_idカラムを削除し、新しいpost_idカラムの名前を変更
        // Schema::table('markdown_likes', function (Blueprint $table) {
        //     $table->dropColumn('post_id');
        //     $table->renameColumn('new_post_id', 'post_id');
        // });
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->dropColumn('post_id');
        //     $table->renameColumn('new_post_id', 'post_id');
        // });

        // // --------------------------------------------------------------------------------------------

        // // 外部キー制約の再設定
        // Schema::table('markdown_likes', function (Blueprint $table) {
        //     $table->foreign('post_id')->references('id')->on('markdown_posts')->onDelete('cascade');
        // });
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->foreign('post_id')->references('id')->on('markdown_posts')->onDelete('cascade');
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // // 外部キー制約の削除
        // Schema::table('markdown_likes', function (Blueprint $table) {
        //     $table->dropForeign(['post_id']);
        // });
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->dropForeign(['post_id']);
        // });

        // // --------------------------------------------------------------------------------------------

        // // 元のプライマリキーを再設定
        // Schema::table('markdown_posts', function (Blueprint $table) {
        //     $table->dropPrimary('id');
        //     $table->bigIncrements('id')->first();
        //     $table->primary('id');
        // });

        // // UUIDカラムの削除
        // Schema::table('markdown_posts', function (Blueprint $table) {
        //     $table->dropColumn('uuid');
        // });

        // // --------------------------------------------------------------------------------------------

        // // 古いpost_idカラムの復元
        // Schema::table('markdown_likes', function (Blueprint $table) {
        //     $table->unsignedBigInteger('post_id')->after('id');
        //     $table->dropColumn('post_id');
        // });
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->unsignedBigInteger('post_id')->after('id');
        //     $table->dropColumn('post_id');
        // });

        // // データを元に戻す
        // DB::statement('UPDATE markdown_likes SET post_id = (SELECT id FROM markdown_posts WHERE markdown_posts.id::text = markdown_likes.post_id::text)');
        // DB::statement('UPDATE markdown_replies SET post_id = (SELECT id FROM markdown_posts WHERE markdown_posts.id::text = markdown_replies.post_id::text)');

        // // --------------------------------------------------------------------------------------------
        
        // // 外部キー制約の再設定
        // Schema::table('markdown_likes', function (Blueprint $table) {
        //     $table->foreign('post_id')->references('id')->on('markdown_posts')->onDelete('cascade');
        // });
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->foreign('post_id')->references('id')->on('markdown_posts')->onDelete('cascade');
        // });
    }
};
