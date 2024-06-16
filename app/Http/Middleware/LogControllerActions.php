<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; 
use Symfony\Component\HttpFoundation\Response;

class LogControllerActions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $controllerAction = $request->route()->getActionName();

        Log::info("Start: {$controllerAction}");

        $response = $next($request);

        Log::info("End: {$controllerAction}");

        return $response;
    }
}
