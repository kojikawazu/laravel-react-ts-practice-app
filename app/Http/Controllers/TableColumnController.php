<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

/**
 * テーブルカラムコントローラ
 *
 */
class TableColumnController extends Controller
{
    public function index()
    {
        $tables = DB::select("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'");
        $tableColumns = [];

        foreach ($tables as $table) {
            $tableName = $table->tablename;
            $columns = Schema::getColumnListing($tableName);
            $tableColumns[$tableName] = $columns;
        }

        return Inertia::render('Admin/Tables', [
            'tableColumns' => $tableColumns
        ]);
    }
}
