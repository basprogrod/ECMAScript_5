<?php 
get_header(); 
$category = get_queried_object();
$category_id = $category->term_id;
?>
<main class="club-tournament">
    <div class="content with-image">
        <h1 class="section__title section__title-white " id="main-info">
            <?=$category->name;?> Draws
        </h1>
        <div class="kama_breadcrumbs">
            <a href="#">
                Home
            </a>
            <b>
                -
            </b>
            <a href="#">
                Events
            </a>
            <b>
                -
            </b>
            <a href="#">
                Champions League
            </a>
            <b>
                -
            </b>
            <span>
                Draws
            </span>
        </div>
    </div>
    <div class="content menu">
        <ul class="main__menu">
            <li class="main__menu-it">
                <a href="#">
                    Overview
                </a>
            </li>
            <li class="main__menu-it main__menu-it_active">
                <a href="#">
                    Draws
                </a>
            </li>
            <li class="main__menu-it">
                <a href="#">
                    News
                </a>
            </li>
            <li class="main__menu-it">
                <a href="#">
                    Video and Media
                </a>
            </li>
        </ul>
    </div>
    <div class="content page-content">
    	<?php 
	      $groups_items = get_field('event_groups', 'category_'.$category_id);
	      if($groups_items) {
	    ?>
        <!-- .block -->
        <section class="block">
            <div class="content">
                <div class="block__head">
                    <h2 class="block__title">
                        Qualifying round
                    </h2>
                    <div class="block__arrows">
                        <div class="addicon-left">
                        </div>
                        <div class="addicon-right">
                        </div>
                    </div>
                </div>
                <div class="block__tabs">
                	<?php foreach($groups_items as $group_item) { ?>
                    <div class="block__tab">
                        <div class="block__tab-title">
                            Group <?=$group_item['group_letter'];?>
                        </div>
                        <?php foreach($group_item['teams'] as $team_info) { ?>
                        <div class="block__tab-cell">
                            <span class="group__flag group__en">
                                <img alt="<?=$team_info['team']->post_title;?>" src="<?php echo get_the_post_thumbnail_url($team_info['team']->ID, 'full'); ?>">
                                </img>
                            </span>
                            <?=$team_info['team']->post_title;?>
                        </div>
                    	<?php } ?>
                    </div>
                	<?php } ?>
                </div>
            </div>
        </section>
        <!-- /.block -->
    	<?php } ?>
        <div class="more-info">
            <div class="more-info__row">
            	<?php 
            	$event_group_stage_draw = get_field('event_group_stage_draw', 'category_'.$category_id);
            	?>
                <div class="more-info__row-block">
                    <div class="block__head">
                        <h2 class="block__title" id="other">
                            <?=$event_group_stage_draw['title'];?>
                        </h2>
                    </div>
                    <div class="club-tournament__video">
                        <div class="more-info__video-popup" style="display: none;">
                            <div class="close-ico">
                            </div>
                            <div class="more-info__video-popup-block">
                                <iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" src="<?=$event_group_stage_draw['video'];?>" style="width: 100%; height: 100%;border: none;">
                                </iframe>
                            </div>
                        </div>
                        <div class="club-tournament__video-left player-play">
                            <img alt="<?=$event_group_stage_draw['image_in_video']['alt'];?>" src="<?=$event_group_stage_draw['image_in_video']['url'];?>">
                            </img>
                        </div>
                        <div class="club-tournament__video-right">
                            <?=$event_group_stage_draw['text'];?>
                        </div>
                    </div>
                </div>
            </div>
            <?php 
		      $groups_items = get_field('event_groups', 'category_'.$category_id);
		      if($groups_items) {
		    ?>
            <section class="block">
                <div class="content">
                    <div class="block__head">
                        <h2 class="block__title">
                            Season calendar
                        </h2>
                    </div>
                    <div class="block__groups">
                        <div class="block__groups-wrap">
                            <?php foreach($groups_items as $group_item) { ?>
				            <div class="block__group ">
				              <div class="block__group-title">Group <?=$group_item['group_letter'];?></div>
				              <?php if($group_item['places']) { ?>
				                <?php foreach($group_item['places'] as $place_info) { ?>
				                <div class="block__gruop-val"><a href="<?=$place_info['link'];?>"><?=$place_info['text_in_link'];?></a><?=$place_info['text_out_link'];?></div>
				                <?php } ?>
				              <?php } ?>
				            </div>
				            <?php } ?>
                        </div>
                    </div>
                    <?php 
				      if(get_field('event_regulations', 'category_'.$category_id)) {
				        $event_regulations = get_field('event_regulations', 'category_'.$category_id);
				        $icons_regulations = array(0 => 'addicon-star', 1 => 'addicon-18', 2 => 'addicon-14', 3 => 'addicon-12', 4 => 'addicon-IMG-win');
				        $i = 0;
				    ?>
                    <div class="block__timetable">
                    	<?php foreach($event_regulations as $item_regulations) { ?>
					      <div class="block__timetable-title">
					        <span class="block__timetable-circle <?php echo $icons_regulations[$i]; ?>"></span> <?=$item_regulations['stage'];?>
					      </div>
					      <div class="block__timetable-entries">
					      	<?php if($item_regulations['events']) { ?>
						        <?php foreach($item_regulations['events'] as $item_event) { ?>
						        <div class="block__timetable-entry addicon-ball">
						          <span><?php echo $item_event['date_event']; ?></span><span><?php echo $item_event['text']; ?></span>
						        </div>
						        <?php } ?>
					        <?php } ?>
					      </div>
					      <?php $i++; } ?>
					    </div>
					    <?php } ?>
                    </div>
                </div>
            </section>
            <?php } ?>
        </div>
    </div>
    <div class="content">
        <div class="section__share section__share-big playerWiki jcsb">
            <div class="section__share-subcribe section__share-first">
                <div class="section__share-text">
                    Share it!
                </div>
                <div class="socials flex">
                   <a href="https://telegram.me/share/url?<?php echo 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>" class="footer__ico icon-telegram" target="_blank"></a>
       				<a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>" class="footer__ico icon-fb" target="_blank"></a>
       				<a href="https://twitter.com/share?url=<?php echo 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>&text=<?php the_title(); ?>" class="footer__ico icon-twit" target="_blank"></a>
                    </a>
                </div>
            </div>
            <!-- <form action="#" class="section__share-subcribe">
        <input type="text" class="" placeholder="Subscribe to the latest news">
        <button type="submit" class="section__post-btn">Subscribe</button>
      </form > -->
        </div>
    </div>
</main>
<?php get_footer(); ?>
