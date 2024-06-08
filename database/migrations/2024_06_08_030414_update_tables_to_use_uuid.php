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
        // // UUIDカラムを追加
        // Schema::table('markdown_likes', function (Blueprint $table) {
        //     $table->uuid('uuid')->nullable()->unique()->after('id');
        // });

        // // 既存のデータにUUIDを設定
        // DB::statement('UPDATE markdown_likes SET uuid = uuid_generate_v4() WHERE uuid IS NULL');

        // // UUIDカラムをNOT NULLに変更
        // Schema::table('markdown_likes', function (Blueprint $table) {
        //     $table->uuid('uuid')->nullable(false)->change();
        // });

        // // --------------------------------------------------------------------------------------------

        // // プライマリキーの変更の準備
        // Schema::table('markdown_likes', function (Blueprint $table) {
        //     $table->dropPrimary('id');
        // });

        // // UUIDをプライマリキーに設定
        // Schema::table('markdown_likes', function (Blueprint $table) {
        //     $table->primary('uuid');
        //     $table->dropColumn('id');
        //     $table->renameColumn('uuid', 'id');
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // // 元のプライマリキーを再設定
        // Schema::table('markdown_likes', function (Blueprint $table) {
        //     $table->dropPrimary('id');
        //     $table->bigIncrements('id')->first();
        //     $table->primary('id');
        // });

        // // UUIDカラムの削除
        // Schema::table('markdown_likes', function (Blueprint $table) {
        //     $table->dropColumn('uuid');
        // });
    }
};
