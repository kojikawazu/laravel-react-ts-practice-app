<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * お問い合わせコントローラー
 */
class ContactController extends Controller
{
    public function index()
    {
        return inertia('Contact/Contact');
    }
}
