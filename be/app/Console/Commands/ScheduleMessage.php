<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\scheduleMessageController;
use Illuminate\Console\Scheduling\Schedule;

class ScheduleMessage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'schedule:message';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check message schedule';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $scheduleMessage = new scheduleMessageController;
        $checkSchedule = $scheduleMessage->checkSchedule();

        $this->info($checkSchedule);

    }
}
