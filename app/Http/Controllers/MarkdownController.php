<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MarkdownController extends Controller
{
    public function index()
    {
        return inertia('Markdown/Markdown');
    }
}
