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
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->uuid('uuid')->nullable()->unique()->first();
        // });

        // // 既存のデータにUUIDを設定
        // DB::statement('UPDATE markdown_replies SET uuid = uuid_generate_v4() WHERE uuid IS NULL');

        // // UUIDカラムをNOT NULLに変更
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->uuid('uuid')->nullable(false)->change();
        // });

        // // --------------------------------------------------------------------------------------------

        // // 外部キー制約の削除
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->dropForeign(['parent_id']);
        // });

        // // --------------------------------------------------------------------------------------------

        // // parent_idカラムの型変更の準備
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->uuid('new_parent_id')->nullable()->after('parent_id');
        // });

        // // 新しいUUIDカラムにデータを移行
        // DB::statement('UPDATE markdown_replies SET new_parent_id = (SELECT uuid FROM markdown_replies AS parent WHERE parent.id = markdown_replies.parent_id)');

        // // 新しいUUIDカラムをNOT NULLに変更
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->uuid('new_parent_id')->nullable(false)->change();
        // });

        // // 古いparent_idカラムを削除し、新しいparent_idカラムの名前を変更
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->dropColumn('parent_id');
        //     $table->renameColumn('new_parent_id', 'parent_id');
        // });

        // // --------------------------------------------------------------------------------------------

        // // プライマリキーの変更の準備
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->dropPrimary('id');
        // });

        // // UUIDをプライマリキーに設定
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->primary('uuid');
        //     $table->dropColumn('id');
        //     $table->renameColumn('uuid', 'id');
        // });

        // // --------------------------------------------------------------------------------------------

        // // 外部キー制約の再設定
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->foreign('parent_id')->references('id')->on('markdown_replies')->onDelete('cascade');
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // // 外部キー制約の削除（parent_idのみ）
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->dropForeign(['parent_id']);
        // });

        // // --------------------------------------------------------------------------------------------

        // // 元のプライマリキーを再設定
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->dropPrimary('id');
        //     $table->bigIncrements('id')->first();
        //     $table->primary('id');
        // });

        // // UUIDカラムの削除
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->dropColumn('uuid');
        // });

        // // --------------------------------------------------------------------------------------------

        // // parent_idカラムの型変更の準備
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->dropColumn('parent_id');
        //     $table->unsignedBigInteger('parent_id');
        // });

        // // 古いparent_idカラムにデータを移行
        // DB::statement('UPDATE markdown_replies SET parent_id = (SELECT id FROM markdown_replies AS parent WHERE parent.uuid = markdown_replies.parent_id)');

        // // --------------------------------------------------------------------------------------------

        // // 外部キー制約の再設定
        // Schema::table('markdown_replies', function (Blueprint $table) {
        //     $table->foreign('parent_id')->references('id')->on('markdown_replies')->onDelete('cascade');
        // });
    }
};
