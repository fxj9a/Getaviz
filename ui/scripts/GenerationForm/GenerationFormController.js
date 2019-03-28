var generationFormController = (function() {
	
	// Name Conversion Rules from "label" to "bind"
	// Example: city.building_type --> city_building_type	
	// Most options in the file settings.properties contain a "."
	// If "." is used in "bind" the ui does not load ("." is interpreted as a function call)
	
	var logObjectMap = new Map();
	
	var controllerConfig = {
		createHeadSection: true
	}
	
	function initialize(setupConfig){																// finished!
		application.transferConfigParams(setupConfig, controllerConfig);
	}
	
	function activate(rootDiv){
		
		createSettingPopup(rootDiv);
		
		$("#settingsPopupWindowDiv").jqxWindow({ theme: "metro", width: 650, height: 950, isModal: true, autoOpen: false, resizable: true, cancelButton: $("#cancelSetChanges"), initContent: function() {
		   
				// Add Form Inputs and Labels here
 				var template = [
					
					// Independent Options 					
					{
						bind: 'input_name',
						name: 'input.name',
						type: 'text',
						label: 'input.name',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'input_files',
						name: 'input.files',
						type: 'text',
						label: 'input.files',
						//required: true,
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'output_format',
						name: 'output.format',
						type: 'option',
						label: 'output.format',
						labelWidth: '325px',
						width: '250px',
						component: 'jqxDropDownList',
						options: [
							{ value: 'aframe' },
							{ value: 'x3d'}
						],
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'metaphor',
						name: 'metaphor',
						type: 'option',
						label: 'metaphor',
						labelWidth: '325px',
						width: '250px',
						component: 'jqxDropDownList',
						options: [
							{ value: 'rd' },
							{ value: 'city'}
						],
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},							
					// only available if output.format == 'x3d' 
					{
						bind: 'convert_to_multipart',
						name: 'convert_to_multipart',
						type: 'option',
						label: 'convert_to_multipart',
						labelWidth: '325px',
						width: '250px',
						component: 'jqxDropDownList',
						options: [
							{ value: 'false' },
							{ value: 'true'}
						],
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},				
					{
						type: 'blank',
						rowHeight: '25px'
					},
					
					// City Options 
					{
						bind: 'city_building_type',
						name: 'city.building_type',
						type: 'option',
						label: 'city.building_type',
						labelWidth: '325px',
						width: '250px',
						component: 'jqxDropDownList',
						options: [
							{ value: 'original' },
							{ value: 'panels'},
							{ value: 'bricks'},
							{ value: 'floor'}
						],
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_scheme',
						name: 'city.scheme',
						type: 'option',
						label: 'city.scheme',
						labelWidth: '325px',
						width: '250px',
						component: 'jqxDropDownList',
						options: [
							{ value: 'types' },
							{ value: 'visibility'}
						],
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_class_elements_mode',
						name: 'city.class_elements_mode',
						type: 'option',
						label: 'city.class_elements_mode',
						labelWidth: '325px',
						width: '250px',
						component: 'jqxDropDownList',
						options: [
							{ value: 'methods_and_attributes' },
							{ value: 'methods_only'},
							{ value: 'attributes_only'}
						],
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_class_elements_sort_mode_coarse',
						name: 'city.class_elements_sort_mode_coarse',
						type: 'option',
						label: 'city.class_elements_sort_mode_coarse',
						labelWidth: '325px',
						width: '250px',
						component: 'jqxDropDownList',
						options: [
							{ value: 'methods_first' },
							{ value: 'unsorted'},
							{ value: 'attributes_first'}
						],
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_class_elements_sort_mode_fine',
						name: 'city.class_elements_sort_mode_fine',
						type: 'option',
						label: 'city.class_elements_sort_mode_fine',
						labelWidth: '325px',
						width: '250px',
						component: 'jqxDropDownList',
						options: [
							{ value: 'scheme' },
							{ value: 'unsorted'},
							{ value: 'alphabetically'},
							{ value: 'nos'}
						],
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_class_elements_sort_mode_fine_direction_reversed',
						name: 'city.class_elements_sort_mode_fine_direction_reversed',
						type: 'option',
						label: 'city.class_elements_sort_mode_fine_direction_reversed',
						labelWidth: '325px',
						width: '250px',
						component: 'jqxDropDownList',
						options: [
							{ value: 'false' },
							{ value: 'true'}
						],
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_show_building_base',
						name: 'city.show_building_base',
						type: 'option',
						label: 'city.show_building_base',
						labelWidth: '325px',
						width: '250px',
						component: 'jqxDropDownList',
						options: [
							{ value: 'true' },
							{ value: 'false'}
						],
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},						
					{
						bind: 'city_blank_node',
						name: 'city_blank_node',
						type: 'blank',
						rowHeight: '25px'
					},					
					{
						bind: 'city_show_attributes_as_cylinders',
						name: 'city.show_attributes_as_cylinders',
						type: 'option',
						label: 'city.show_attributes_as_cylinders',
						labelWidth: '325px',
						width: '250px',
						component: 'jqxDropDownList',
						options: [
							{ value: 'true' },
							{ value: 'false'}
						],
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_brick_layout',
						name: 'city.brick.layout',
						type: 'option',
						label: 'city.brick.layout',
						labelWidth: '325px',
						width: '250px',
						component: 'jqxDropDownList',
						options: [
							{ value: 'progressive' },
							{ value: 'straight'},
							{ value: 'balanced'}
						],
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_brick_size',
						name: 'city.brick.size',
						type: 'number',
						label: 'city.brick.size',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_brick_horizontal_margin',
						name: 'city.brick.horizontal_margin',
						type: 'number',
						label: 'city.brick.horizontal_margin',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_brick_horizontal_gap',
						name: 'city.brick.horizontal_gap',
						type: 'number',
						label: 'city.brick.horizontal_gap',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_brick_vertical_margin',
						name: 'city.brick.vertical_margin',
						type: 'number',
						label: 'city.brick.vertical_margin',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_brick_vertical_gap',
						name: 'city.brick.vertical_gap',
						type: 'number',
						label: 'city.brick.vertical_gap',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_panel_separator_mode',
						name: 'city.panel.separator_mode',
						type: 'option',
						label: 'city.panel.separator_mode',
						labelWidth: '325px',
						width: '250px',
						component: 'jqxDropDownList',
						options: [
							{ value: 'separator' },
							{ value: 'none'},
							{ value: 'gap'}
						],
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_panel_height_treshold_nos',
						name: 'city.panel.height_treshold_nos',
						type: 'option',
						label: 'city.panel.height_treshold_nos',
						labelWidth: '325px',
						width: '250px',
						component: 'jqxDropDownList',
						options: [
							{ value: '3' },
							{ value: '6'},
							{ value: '12'},
							{ value: '24'},
							{ value: '48'},
							{ value: '96'},
							{ value: '144'},
							{ value: '192'},
							{ value: '240'}
						],
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_panel_height_unit',
						name: 'city.panel.height_unit',
						type: 'number',
						label: 'city.panel.height_unit',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_panel_horizontal_margin',
						name: 'city.panel.horizontal_margin',
						type: 'number',
						label: 'city.panel.horizontal_margin',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_panel_vertical_margin',
						name: 'city.panel.vertical_margin',
						type: 'number',
						label: 'city.panel.vertical_margin',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_panel_vertical_gap',
						name: 'city.panel.vertical_gap',
						type: 'number',
						label: 'city.panel.vertical_gap',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_panel_separator_height',
						name: 'city.panel.separator_height',
						type: 'number',
						label: 'city.panel.separator_height',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_original_building_metric',
						name: 'city.original_building_metric',
						type: 'option',
						label: 'city.original_building_metric',
						labelWidth: '325px',
						width: '250px',
						component: 'jqxDropDownList',
						options: [
							{ value: 'none' },
							{ value: 'nos'}
						],
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_width_min',
						name: 'city.width_min',
						type: 'number',
						label: 'city.width_min',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_height_min',
						name: 'city.height_min',
						type: 'number',
						label: 'city.height_min',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_building_horizontal_margin',
						name: 'city.building.horizontal_margin',
						type: 'number',
						label: 'city.building.horizontal_margin',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_building_horizontal_gap',
						name: 'city.building.horizontal_gap',
						type: 'number',
						label: 'city.building.horizontal_gap',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_building_vertical_margin',
						name: 'city.building.vertical_margin',
						type: 'number',
						label: 'city.building.vertical_margin',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_package_color_start',
						name: 'city.package.color_start',
						type: 'text',
						label: 'city.package.color_start',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_package_color_end',
						name: 'city.package.color_end',
						type: 'text',
						label: 'city.package.color_end',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_class_color_start',
						name: 'city.class.color_start',
						type: 'text',
						label: 'city.class.color_start',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_class_color_end',
						name: 'city.class.color_end',
						type: 'text',
						label: 'city.class.color_end',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_class_color',
						name: 'city.class.color',
						type: 'text',
						label: 'city.class.color',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_color_blue',
						name: 'city.color.blue',
						type: 'text',
						label: 'city.color.blue',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_color_aqua',
						name: 'city.color.aqua',
						type: 'text',
						label: 'city.color.aqua',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_color_light_green',
						name: 'city.color.light_green',
						type: 'text',
						label: 'city.color.light_green',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_color_dark_green',
						name: 'city.color.dark_green',
						type: 'text',
						label: 'city.color.dark_green',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_color_yellow',
						name: 'city.color.yellow',
						type: 'text',
						label: 'city.color.yellow',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_color_orange',
						name: 'city.color.orange',
						type: 'text',
						label: 'city.color.orange',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_color_red',
						name: 'city.color.red',
						type: 'text',
						label: 'city.color.red',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_color_pink',
						name: 'city.color.pink',
						type: 'text',
						label: 'city.color.pink',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_color_violet',
						name: 'city.color.violet',
						type: 'text',
						label: 'city.color.violet',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_color_light_grey',
						name: 'city.color.light_grey',
						type: 'text',
						label: 'city.color.light_grey',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_color_dark_grey',
						name: 'city.color.dark_grey',
						type: 'text',
						label: 'city.color.dark_grey',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_color_white',
						name: 'city.color.white',
						type: 'text',
						label: 'city.color.white',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'city_color_black',
						name: 'city.color.black',
						type: 'text',
						label: 'city.color.black',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},
					
					// Recursive Disk Options 					
					{
						bind: 'rd_data_factor',
						name: 'rd.data_factor',
						type: 'number',
						label: 'rd.data_factor',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_method_factor',
						name: 'rd.method_factor',
						type: 'number',
						label: 'rd.method_factor',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_height',
						name: 'rd.height',
						type: 'number',
						label: 'rd.height',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_height_boost',
						name: 'rd.height_boost',
						type: 'number',
						label: 'rd.height_boost',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_height_multiplicator',
						name: 'rd.height_multiplicator',
						type: 'number',
						label: 'rd.height_multiplicator',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_ring_width',
						name: 'rd.ring_width',
						type: 'number',
						label: 'rd.ring_width',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_ring_width_md',
						name: 'rd.ring_width_md',
						type: 'number',
						label: 'rd.ring_width_md',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_ring_width_ad',
						name: 'rd.ring_width_ad',
						type: 'number',
						label: 'rd.ring_width_ad',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_min_area',
						name: 'rd.min_area',
						type: 'number',
						label: 'rd.min_area',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_namespace_transparency',
						name: 'rd.namespace_transparency',
						type: 'number',
						label: 'rd.namespace_transparency',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_class_transparency',
						name: 'rd.class_transparency',
						type: 'number',
						label: 'rd.class_transparency',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_method_transparency',
						name: 'rd.method_transparency',
						type: 'number',
						label: 'rd.method_transparency',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_data_transparency',
						name: 'rd.data_transparency',
						type: 'number',
						label: 'rd.data_transparency',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '250px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_color_class',
						name: 'rd.color.class',
						type: 'text',
						label: 'rd.color.class',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_color_data',
						name: 'rd.color.data',
						type: 'text',
						label: 'rd.color.data',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_color_method',
						name: 'rd.color.method',
						type: 'text',
						label: 'rd.color.method',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_color_namespace',
						name: 'rd.color.namespace',
						type: 'text',
						label: 'rd.color.namespace',
						labelPosition: 'left',
						labelWidth: '325px',
						align: 'left',
						width: '244px',
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_method_disks',
						name: 'rd.method_disks',
						type: 'option',
						label: 'rd.method_disks',
						labelWidth: '325px',
						width: '250px',
						component: 'jqxDropDownList',
						options: [
							{ value: 'false' },
							{ value: 'true'}
						],
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_data_disks',
						name: 'rd.data_disks',
						type: 'option',
						label: 'rd.data_disks',
						labelWidth: '325px',
						width: '250px',
						component: 'jqxDropDownList',
						options: [
							{ value: 'false' },
							{ value: 'true'}
						],
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},					
					{
						bind: 'rd_method_type_mode',
						name: 'rd.method_type_mode',
						type: 'option',
						label: 'rd.method_type_mode',
						labelWidth: '325px',
						width: '250px',
						component: 'jqxDropDownList',
						options: [
							{ value: 'false' },
							{ value: 'true'}
						],
						padding: {left: 0, top: 0, bottom: 0, right: 0}
					},
					{
						type: 'blank',
						rowHeight: '25px',
					},
					{
						name: 'submitButton',
						type: 'button',
						text: 'Submit',
						align: 'right',
						padding: {left: 20, top: 5, bottom: 5, right: 20}
					}
					
				];
				
				// Default Values 				
				var defaultValue = {
					input_name: 'default',
					output_format: 'aframe',
					metaphor: 'city',
					convert_to_multipart: false,
					city_building_type: 'original',
					city_scheme: 'types',
					city_class_elements_mode: 'methods_and_attributes',
					city_class_elements_sort_mode_coarse: 'methods_first',
					city_class_elements_sort_mode_fine: 'scheme',
					city_class_elements_sort_mode_fine_direction_reversed: false,
					city_show_building_base: true,
					city_show_attributes_as_cylinders: true,
					city_brick_layout: 'progressive',
					city_brick_size: 1.0,
					city_brick_horizontal_margin: 0.5,
					city_brick_horizontal_gap: 0.2,
					city_brick_vertical_margin: 0.2,
					city_brick_vertical_gap: 0.2,
					city_panel_separator_mode: 'separator',
					city_panel_height_treshold_nos: 3,
					city_panel_height_unit: 0.5,
					city_panel_horizontal_margin: 0.5,
					city_panel_vertical_margin: 0.25,
					city_panel_vertical_gap: 0.125,
					city_panel_separator_height: 0.125,
					city_original_building_metric: 'none',
					city_width_min: 1,
					city_height_min: 1,
					city_building_horizontal_margin: 3.0,
					city_building_horizontal_gap: 3.0,
					city_building_vertical_margin: 1.0,
					city_package_color_start: '#969696',
					city_package_color_end: '#F0F0F0',
					city_class_color_start: '#131615',
					city_class_color_end: '#00FF00',
					city_class_color: '#353559',
					city_color_blue: '#99FFCC',
					city_color_aqua: '#99CCFF',
					city_color_light_green: '#CCFF99',
					city_color_dark_green: '#99FF99',	
					city_color_yellow: '#FFFF99',	
					city_color_orange: '#FFCC99',	
					city_color_red: '#FF9999',
					city_color_pink: '#FF99FF',
					city_color_violet: '#9999FF',
					city_color_light_grey: '#CCCCCC',	
					city_color_dark_grey: '#999999',	
					city_color_white: '#FFFFFF',	
					city_color_black: '#000000',	
					rd_data_factor: 4.0,
					rd_method_factor: 1.0,
					rd_height: 1.0,
					rd_height_boost: 8.0,
					rd_height_multiplicator: 50.0,
					rd_ring_width: 2.0,
					rd_ring_width_md: 0,
					rd_ring_width_ad: 0,
					rd_min_area: 10.0,
					rd_namespace_transparency: 0,
					rd_class_transparency: 0,
					rd_method_transparency: 0,
					rd_data_transparency: 0,
					rd_color_class: '#353559',
					rd_color_data: '#FFFC19',
					rd_color_method: '#1485CC',
					rd_color_namespace: '#969696',
					rd_method_disks: false,
					rd_data_disks: false,
					rd_method_type_mode: false					
				};
				
				// generate Form 
				var settingsForm = $('#settingsForm');
				settingsForm.jqxForm({
					template: template,
					value: defaultValue,
					padding: { left: 10, top: 10, right: 10, bottom: 10 }
					
				});	

				// On first load show only the input fields for initially selected options (aframe, city, optional)
				initial_load_aframe_city_optional();
				
				// formDataChange Event 
				settingsForm.on('formDataChange', function (event) {
					var args = event.args;
					var newValue = args.value;
					var previousValue = args.previousValue;		

					// Elements shown/hidden based on choice 'city' vs 'rd' 
					if (newValue.metaphor == 'city') {
					
						$('#settingsForm').jqxForm('showComponent', 'city.building_type');
						$('#settingsForm').jqxForm('showComponent', 'city.scheme');
						$('#settingsForm').jqxForm('showComponent', 'city.class_elements_mode');
						$('#settingsForm').jqxForm('showComponent', 'city.class_elements_sort_mode_coarse');
						$('#settingsForm').jqxForm('showComponent', 'city.class_elements_sort_mode_fine');
						$('#settingsForm').jqxForm('showComponent', 'city.class_elements_sort_mode_fine_direction_reversed');
						$('#settingsForm').jqxForm('showComponent', 'city.show_building_base');	
						$('#settingsForm').jqxForm('showComponent', 'city.width_min');
						$('#settingsForm').jqxForm('showComponent', 'city.height_min');
						$('#settingsForm').jqxForm('showComponent', 'city.building.horizontal_margin');
						$('#settingsForm').jqxForm('showComponent', 'city.building.horizontal_gap');
						$('#settingsForm').jqxForm('showComponent', 'city.building.vertical_margin');
						$('#settingsForm').jqxForm('showComponent', 'city.package.color_start');
						$('#settingsForm').jqxForm('showComponent', 'city.package.color_end');
						$('#settingsForm').jqxForm('showComponent', 'city.class.color_start');
						$('#settingsForm').jqxForm('showComponent', 'city.class.color_end');
						$('#settingsForm').jqxForm('showComponent', 'city.class.color');
						$('#settingsForm').jqxForm('showComponent', 'city.color.blue');
						$('#settingsForm').jqxForm('showComponent', 'city.color.aqua');
						$('#settingsForm').jqxForm('showComponent', 'city.color.light_green');
						$('#settingsForm').jqxForm('showComponent', 'city.color.dark_green');
						$('#settingsForm').jqxForm('showComponent', 'city.color.yellow');
						$('#settingsForm').jqxForm('showComponent', 'city.color.orange');
						$('#settingsForm').jqxForm('showComponent', 'city.color.red');
						$('#settingsForm').jqxForm('showComponent', 'city.color.pink');
						$('#settingsForm').jqxForm('showComponent', 'city.color.violet');
						$('#settingsForm').jqxForm('showComponent', 'city.color.light_grey');
						$('#settingsForm').jqxForm('showComponent', 'city.color.dark_grey');
						$('#settingsForm').jqxForm('showComponent', 'city.color.white');
						$('#settingsForm').jqxForm('showComponent', 'city.color.black');
						$('#settingsForm').jqxForm('hideComponent', 'rd.data_factor');	
						$('#settingsForm').jqxForm('hideComponent', 'rd.method_factor');
						$('#settingsForm').jqxForm('hideComponent', 'rd.height');
						$('#settingsForm').jqxForm('hideComponent', 'rd.height_boost');
						$('#settingsForm').jqxForm('hideComponent', 'rd.height_multiplicator');
						$('#settingsForm').jqxForm('hideComponent', 'rd.ring_width');
						$('#settingsForm').jqxForm('hideComponent', 'rd.ring_width_md');
						$('#settingsForm').jqxForm('hideComponent', 'rd.ring_width_ad');
						$('#settingsForm').jqxForm('hideComponent', 'rd.min_area');
						$('#settingsForm').jqxForm('hideComponent', 'rd.namespace_transparency');
						$('#settingsForm').jqxForm('hideComponent', 'rd.class_transparency');
						$('#settingsForm').jqxForm('hideComponent', 'rd.method_transparency');
						$('#settingsForm').jqxForm('hideComponent', 'rd.data_transparency');
						$('#settingsForm').jqxForm('hideComponent', 'rd.color.class');
						$('#settingsForm').jqxForm('hideComponent', 'rd.color.data');
						$('#settingsForm').jqxForm('hideComponent', 'rd.color.method');
						$('#settingsForm').jqxForm('hideComponent', 'rd.color.namespace');
						$('#settingsForm').jqxForm('hideComponent', 'rd.method_disks');
						$('#settingsForm').jqxForm('hideComponent', 'rd.data_disks');
						$('#settingsForm').jqxForm('hideComponent', 'rd.method_type_mode');	
					
						// Elements shown/hidden based on choice 'panels' vs 'bricks' vs 'original' || 'floor' 
						if (newValue.city_building_type == 'panels') {	
						
							$('#settingsForm').jqxForm('showComponent', 'city.show_attributes_as_cylinders');
							$('#settingsForm').jqxForm('showComponent', 'city.panel.separator_mode');
							$('#settingsForm').jqxForm('showComponent', 'city.panel.height_treshold_nos');
							$('#settingsForm').jqxForm('showComponent', 'city.panel.height_unit');
							$('#settingsForm').jqxForm('showComponent', 'city.panel.horizontal_margin');
							$('#settingsForm').jqxForm('showComponent', 'city.panel.vertical_margin');
							$('#settingsForm').jqxForm('showComponent', 'city.panel.vertical_gap');
							$('#settingsForm').jqxForm('showComponent', 'city.panel.separator_height');							
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.layout');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.size');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.horizontal_margin');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.horizontal_gap');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.vertical_margin');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.vertical_gap');		
							$('#settingsForm').jqxForm('hideComponent', 'city.original_building_metric');
							
						} else if (newValue.city_building_type == 'floor') {
						
							$('#settingsForm').jqxForm('hideComponent', 'city.show_attributes_as_cylinders');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.separator_mode');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.height_treshold_nos');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.height_unit');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.horizontal_margin');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.vertical_margin');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.vertical_gap');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.separator_height');					
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.layout');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.size');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.horizontal_margin');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.horizontal_gap');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.vertical_margin');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.vertical_gap');									
							$('#settingsForm').jqxForm('hideComponent', 'city.original_building_metric');
							
						} else if (newValue.city_building_type == 'original') {
							
							$('#settingsForm').jqxForm('hideComponent', 'city.show_attributes_as_cylinders');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.separator_mode');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.height_treshold_nos');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.height_unit');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.horizontal_margin');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.vertical_margin');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.vertical_gap');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.separator_height');							
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.layout');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.size');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.horizontal_margin');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.horizontal_gap');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.vertical_margin');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.vertical_gap');							
							$('#settingsForm').jqxForm('showComponent', 'city.original_building_metric');
							
						} else if (newValue.city_building_type == 'bricks') {
						
							$('#settingsForm').jqxForm('hideComponent', 'city.show_attributes_as_cylinders');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.separator_mode');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.height_treshold_nos');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.height_unit');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.horizontal_margin');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.vertical_margin');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.vertical_gap');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.separator_height');
							$('#settingsForm').jqxForm('showComponent', 'city.brick.layout');
							$('#settingsForm').jqxForm('showComponent', 'city.brick.size');
							$('#settingsForm').jqxForm('showComponent', 'city.brick.horizontal_margin');
							$('#settingsForm').jqxForm('showComponent', 'city.brick.horizontal_gap');
							$('#settingsForm').jqxForm('showComponent', 'city.brick.vertical_margin');
							$('#settingsForm').jqxForm('showComponent', 'city.brick.vertical_gap');								
							$('#settingsForm').jqxForm('hideComponent', 'city.original_building_metric');
						}
						
					} else if (newValue.metaphor == 'rd') {
					
						$('#settingsForm').jqxForm('hideComponent', 'city.building_type');
						$('#settingsForm').jqxForm('hideComponent', 'city.scheme');
						$('#settingsForm').jqxForm('hideComponent', 'city.class_elements_mode');
						$('#settingsForm').jqxForm('hideComponent', 'city.class_elements_sort_mode_coarse');
						$('#settingsForm').jqxForm('hideComponent', 'city.class_elements_sort_mode_fine');
						$('#settingsForm').jqxForm('hideComponent', 'city.class_elements_sort_mode_fine_direction_reversed');
						$('#settingsForm').jqxForm('hideComponent', 'city.show_building_base');
						$('#settingsForm').jqxForm('hideComponent', 'city_blank_node');
							$('#settingsForm').jqxForm('hideComponent', 'city.show_attributes_as_cylinders');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.separator_mode');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.height_treshold_nos');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.height_unit');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.horizontal_margin');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.vertical_margin');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.vertical_gap');
							$('#settingsForm').jqxForm('hideComponent', 'city.panel.separator_height');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.layout');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.size');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.horizontal_margin');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.horizontal_gap');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.vertical_margin');
							$('#settingsForm').jqxForm('hideComponent', 'city.brick.vertical_gap');
						$('#settingsForm').jqxForm('hideComponent', 'city.original_building_metric');
						$('#settingsForm').jqxForm('hideComponent', 'city.width_min');
						$('#settingsForm').jqxForm('hideComponent', 'city.height_min');
						$('#settingsForm').jqxForm('hideComponent', 'city.building.horizontal_margin');
						$('#settingsForm').jqxForm('hideComponent', 'city.building.horizontal_gap');
						$('#settingsForm').jqxForm('hideComponent', 'city.building.vertical_margin');
						$('#settingsForm').jqxForm('hideComponent', 'city.package.color_start');
						$('#settingsForm').jqxForm('hideComponent', 'city.package.color_end');
						$('#settingsForm').jqxForm('hideComponent', 'city.class.color_start');
						$('#settingsForm').jqxForm('hideComponent', 'city.class.color_end');
						$('#settingsForm').jqxForm('hideComponent', 'city.class.color');
						$('#settingsForm').jqxForm('hideComponent', 'city.color.blue');
						$('#settingsForm').jqxForm('hideComponent', 'city.color.aqua');
						$('#settingsForm').jqxForm('hideComponent', 'city.color.light_green');
						$('#settingsForm').jqxForm('hideComponent', 'city.color.dark_green');
						$('#settingsForm').jqxForm('hideComponent', 'city.color.yellow');
						$('#settingsForm').jqxForm('hideComponent', 'city.color.orange');
						$('#settingsForm').jqxForm('hideComponent', 'city.color.red');
						$('#settingsForm').jqxForm('hideComponent', 'city.color.pink');
						$('#settingsForm').jqxForm('hideComponent', 'city.color.violet');
						$('#settingsForm').jqxForm('hideComponent', 'city.color.light_grey');
						$('#settingsForm').jqxForm('hideComponent', 'city.color.dark_grey');
						$('#settingsForm').jqxForm('hideComponent', 'city.color.white');
						$('#settingsForm').jqxForm('hideComponent', 'city.color.black');
						$('#settingsForm').jqxForm('showComponent', 'rd.data_factor');
						$('#settingsForm').jqxForm('showComponent', 'rd.method_factor');
						$('#settingsForm').jqxForm('showComponent', 'rd.height');
						$('#settingsForm').jqxForm('showComponent', 'rd.height_boost');
						$('#settingsForm').jqxForm('showComponent', 'rd.height_multiplicator');
						$('#settingsForm').jqxForm('showComponent', 'rd.ring_width');
						$('#settingsForm').jqxForm('showComponent', 'rd.ring_width_md');
						$('#settingsForm').jqxForm('showComponent', 'rd.ring_width_ad');
						$('#settingsForm').jqxForm('showComponent', 'rd.min_area');
						$('#settingsForm').jqxForm('showComponent', 'rd.namespace_transparency');
						$('#settingsForm').jqxForm('showComponent', 'rd.class_transparency');
						$('#settingsForm').jqxForm('showComponent', 'rd.method_transparency');
						$('#settingsForm').jqxForm('showComponent', 'rd.data_transparency');
						$('#settingsForm').jqxForm('showComponent', 'rd.color.class');
						$('#settingsForm').jqxForm('showComponent', 'rd.color.data');
						$('#settingsForm').jqxForm('showComponent', 'rd.color.method');
						$('#settingsForm').jqxForm('showComponent', 'rd.color.namespace');
						$('#settingsForm').jqxForm('showComponent', 'rd.method_disks');
						$('#settingsForm').jqxForm('showComponent', 'rd.data_disks');
						$('#settingsForm').jqxForm('showComponent', 'rd.method_type_mode');
					}	
					
					if (newValue.output_format == 'x3d') {
					
						$('#settingsForm').jqxForm('showComponent', 'convert_to_multipart');
						
					} else if (newValue.output_format == 'aframe') {
					
						$('#settingsForm').jqxForm('hideComponent', 'convert_to_multipart');	
					}
				
				});
				
				// // Submit Button Validator
				// settingsForm.jqxValidator({ rules: [
					// { input: '#input_files', message: 'Please assign a Name', focus: 'true', rule: 'required', hintType: 'label' },
					// // { input: '#input_files', message: 'Please assign a Name', focus: 'true', rule: 'minLength=3' }
				// ]});
				
				// Submit Form Data 
				var btn = settingsForm.jqxForm('getComponentByName', 'submitButton');
				btn.on('click', function () {
					settingsForm.jqxForm('submit', "http://" + BACKEND +":8080", "_self", 'POST');
				});
            }
        });
		
		events.log.info.subscribe(addLogObject);
		events.log.warning.subscribe(addLogObject);
		events.log.error.subscribe(addLogObject);
		events.log.action.subscribe(addLogObject);
		events.log.event.subscribe(addLogObject);
		events.log.manipulation.subscribe(addLogObject);
	}
	
	// On first load show only the input fields for initially selected options (aframe, city, optional)
	function initial_load_aframe_city_optional() {

		$('#settingsForm').jqxForm('showComponent', 'city.building_type');											// Visibility based on 'city'
		$('#settingsForm').jqxForm('showComponent', 'city.scheme');
		$('#settingsForm').jqxForm('showComponent', 'city.class_elements_mode');
		$('#settingsForm').jqxForm('showComponent', 'city.class_elements_sort_mode_coarse');
		$('#settingsForm').jqxForm('showComponent', 'city.class_elements_sort_mode_fine');
		$('#settingsForm').jqxForm('showComponent', 'city.class_elements_sort_mode_fine_direction_reversed');
		$('#settingsForm').jqxForm('showComponent', 'city.show_building_base');	
		$('#settingsForm').jqxForm('showComponent', 'city.width_min');
		$('#settingsForm').jqxForm('showComponent', 'city.height_min');
		$('#settingsForm').jqxForm('showComponent', 'city.building.horizontal_margin');
		$('#settingsForm').jqxForm('showComponent', 'city.building.horizontal_gap');
		$('#settingsForm').jqxForm('showComponent', 'city.building.vertical_margin');
		$('#settingsForm').jqxForm('showComponent', 'city.package.color_start');
		$('#settingsForm').jqxForm('showComponent', 'city.package.color_end');
		$('#settingsForm').jqxForm('showComponent', 'city.class.color_start');
		$('#settingsForm').jqxForm('showComponent', 'city.class.color_end');
		$('#settingsForm').jqxForm('showComponent', 'city.class.color');
		$('#settingsForm').jqxForm('showComponent', 'city.color.blue');
		$('#settingsForm').jqxForm('showComponent', 'city.color.aqua');
		$('#settingsForm').jqxForm('showComponent', 'city.color.light_green');
		$('#settingsForm').jqxForm('showComponent', 'city.color.dark_green');
		$('#settingsForm').jqxForm('showComponent', 'city.color.yellow');
		$('#settingsForm').jqxForm('showComponent', 'city.color.orange');
		$('#settingsForm').jqxForm('showComponent', 'city.color.red');
		$('#settingsForm').jqxForm('showComponent', 'city.color.pink');
		$('#settingsForm').jqxForm('showComponent', 'city.color.violet');
		$('#settingsForm').jqxForm('showComponent', 'city.color.light_grey');
		$('#settingsForm').jqxForm('showComponent', 'city.color.dark_grey');
		$('#settingsForm').jqxForm('showComponent', 'city.color.white');
		$('#settingsForm').jqxForm('showComponent', 'city.color.black');
		$('#settingsForm').jqxForm('hideComponent', 'rd.data_factor');	
		$('#settingsForm').jqxForm('hideComponent', 'rd.method_factor');
		$('#settingsForm').jqxForm('hideComponent', 'rd.height');
		$('#settingsForm').jqxForm('hideComponent', 'rd.height_boost');
		$('#settingsForm').jqxForm('hideComponent', 'rd.height_multiplicator');
		$('#settingsForm').jqxForm('hideComponent', 'rd.ring_width');
		$('#settingsForm').jqxForm('hideComponent', 'rd.ring_width_md');
		$('#settingsForm').jqxForm('hideComponent', 'rd.ring_width_ad');
		$('#settingsForm').jqxForm('hideComponent', 'rd.min_area');
		$('#settingsForm').jqxForm('hideComponent', 'rd.namespace_transparency');
		$('#settingsForm').jqxForm('hideComponent', 'rd.class_transparency');
		$('#settingsForm').jqxForm('hideComponent', 'rd.method_transparency');
		$('#settingsForm').jqxForm('hideComponent', 'rd.data_transparency');
		$('#settingsForm').jqxForm('hideComponent', 'rd.color.class');
		$('#settingsForm').jqxForm('hideComponent', 'rd.color.data');
		$('#settingsForm').jqxForm('hideComponent', 'rd.color.method');
		$('#settingsForm').jqxForm('hideComponent', 'rd.color.namespace');
		$('#settingsForm').jqxForm('hideComponent', 'rd.method_disks');
		$('#settingsForm').jqxForm('hideComponent', 'rd.data_disks');
		$('#settingsForm').jqxForm('hideComponent', 'rd.method_type_mode');	
		$('#settingsForm').jqxForm('hideComponent', 'city.show_attributes_as_cylinders');							// Visibility based on 'optional'
		$('#settingsForm').jqxForm('hideComponent', 'city.panel_separator_mode');
		$('#settingsForm').jqxForm('hideComponent', 'city.panel_height_treshold_nos');
		$('#settingsForm').jqxForm('hideComponent', 'city.panel_height_unit');
		$('#settingsForm').jqxForm('hideComponent', 'city.panel_horizontal_margin');
		$('#settingsForm').jqxForm('hideComponent', 'city.panel_vertical_margin');
		$('#settingsForm').jqxForm('hideComponent', 'city.panel_vertical_gap');
		$('#settingsForm').jqxForm('hideComponent', 'city.panel_separator_height');							
		$('#settingsForm').jqxForm('hideComponent', 'city.brick.layout');
		$('#settingsForm').jqxForm('hideComponent', 'city.brick_size');
		$('#settingsForm').jqxForm('hideComponent', 'city.brick_horizontal_margin');
		$('#settingsForm').jqxForm('hideComponent', 'city.brick_horizontal_gap');
		$('#settingsForm').jqxForm('hideComponent', 'city.brick_vertical_margin');
		$('#settingsForm').jqxForm('hideComponent', 'city.brick_vertical_gap');							
		$('#settingsForm').jqxForm('showComponent', 'city.original_building_metric');		
		$('#settingsForm').jqxForm('hideComponent', 'convert_to_multipart');										// Visibility based on 'aframe'
	}
	
	// function hide_city() {
	// }
	
	// function hide_city_original() {
	// }
	
	// function hide_rd() {		
	// }
	
	function reset(){
	}
	
	function openSettingsPopUp(){
		$("#settingsPopupWindowDiv").jqxWindow("open");
	}
	
	function addLogObject(logObject){																
	}
	
	function createSettingPopup(rootDiv){
		
		// The Window
		var settingsPopupWindowDiv = document.createElement("DIV");
		rootDiv.appendChild(settingsPopupWindowDiv);
		settingsPopupWindowDiv.id = "settingsPopupWindowDiv";
		
		// The Windows Title
		var settingsPopupTitleDiv = document.createElement("DIV");
		settingsPopupWindowDiv.appendChild(settingsPopupTitleDiv);
		settingsPopupTitleDiv.innerHTML = "New Visualization";
		
		// The Windows DIV
		var settingsPopupContentDiv = document.createElement("DIV");
		settingsPopupWindowDiv.appendChild(settingsPopupContentDiv);
		
		// The Form DIV																				Displays the Form
		var settingsForm = document.createElement("DIV");
		settingsForm.id = "settingsForm";
		settingsPopupContentDiv.appendChild(settingsForm);		
		
		// Button to restore default																// WiP
		// var settingsPopupCancelInput = document.createElement("INPUT");
		// settingsPopupContentDiv.appendChild(settingsPopupCancelInput);
		// settingsPopupCancelInput.type = "button";
		// settingsPopupCancelInput.id = "settingsRestoreDef";
		// settingsPopupCancelInput.value = "Restore Default";
	}
	
	return {
		initialize: initialize,
		activate: activate,
		
		openSettingsPopUp: openSettingsPopUp
	};
	
})();
	